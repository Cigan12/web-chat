import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/auth/entities/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatModel } from './models/chat.model';
import { ChatRepository } from './repositories/chats.repository';
import { EChatTypes } from './types/chat-types.enum';

const pubSub = new PubSub();
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRepository)
        private chatRepository: ChatRepository,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {}

    async createPrivateChat(
        user: User,
        contactId: number,
        message: SendMessageInput['message'],
    ): Promise<ChatModel> {
        const contact = await this.usersRepository.findOne(contactId);
        const newChat = await this.chatRepository.createPrivateChat(
            [user, contact],
            message,
            user,
        );
        console.log(
            '🚀 ~ file: chat.service.ts ~ line 32 ~ ChatService ~ newChat',
            newChat,
        );

        const chatWithName = {
            name: this.getContactName(user.id, newChat.users),
            ...newChat,
        };

        const chatWithMyName = {
            name: user.username,
            ...newChat,
        };

        pubSub.publish('newChatCreated', {
            newChatCreated: chatWithName,
        });

        pubSub.publish('newChatCreated', {
            newChatCreated: chatWithMyName,
        });

        return chatWithName;
    }

    getContactName(userId: number, users: Array<User>) {
        const matchUser = users.find((user) => user.id !== userId);
        return matchUser.username;
    }

    async getChats(user: User, search?: string) {
        const userMatch = await this.usersRepository.findOne({
            relations: ['chats'],
            where: { id: user.id },
        });
        const chats = userMatch.chats.map((chat) => ({
            name: this.getContactName(user.id, chat.users),
            ...chat,
        }));

        if (search) {
            const users = await this.usersRepository.findUserByUserName(
                user,
                search,
            );
            const filteredChats = chats.filter((chat) =>
                chat.name.toLowerCase().includes(search.toLowerCase()),
            );

            const chatContacts = filteredChats
                .map((chat) =>
                    chat.users.filter((chatUser) => chatUser.id !== user.id),
                )
                .flat();

            const unexistingChatsWithUsers = users.filter(
                (searchedUser) =>
                    !chatContacts.find(
                        (chatUser) => chatUser.id === searchedUser.id,
                    ),
            );

            unexistingChatsWithUsers.forEach((unexistingChat) => {
                const newChat = new ChatModel();
                newChat.name = unexistingChat.username;
                newChat.messages = [];
                newChat.type = EChatTypes.private;
                newChat.users = [unexistingChat, user];
                filteredChats.push(newChat as any);
            });

            return filteredChats;
        }

        return chats;
    }

    async sendMessage(user: User, input: SendMessageInput) {
        if (!input.chatId) {
            const existingChat = await this.getPrivateChat(
                user,
                input.contactId,
            );

            if (!existingChat) {
                const chat = await this.createPrivateChat(
                    user,
                    input.contactId,
                    input.message,
                );
                return chat;
            }
        }
        const chat = await this.sendMessageToChat(user, input);

        pubSub.publish('chatUpdated', {
            chatUpdated: {
                name: this.getContactName(user.id, chat.users),
                ...chat,
            },
        });

        pubSub.publish('chatUpdated', {
            chatUpdated: { name: user.username, ...chat },
        });

        return chat;
    }

    async sendMessageToChat(user: User, input: SendMessageInput) {
        const chat = await this.chatRepository.sendMessage(user, input);
        return chat;
    }

    async getPrivateChat(user: User, userId: number) {
        if (!userId) {
            throw new InternalServerErrorException('Something went wrong');
        }

        const chats = await this.getChats(user);

        const matchingChat = chats.find((chat) =>
            Boolean(chat.users.find((chatUser) => chatUser.id === userId)),
        );

        if (!matchingChat) {
            return undefined;
        }
        return {
            name: this.getContactName(user.id, matchingChat.users),
            ...matchingChat,
        };
    }

    // SUBSCRIPTIONS
    chatUpdated() {
        return pubSub.asyncIterator('chatUpdated');
    }

    newChatCreated() {
        return pubSub.asyncIterator('newChatCreated');
    }
}
