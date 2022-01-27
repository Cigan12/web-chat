import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { User } from 'src/auth/entities/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatRepository } from './repositories/chats.repository';

const pubSub = new PubSub();
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRepository)
        private chatRepository: ChatRepository,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {}

    async createPrivateChat(user: User, contactId: number) {
        const contact = await this.usersRepository.findOne(contactId);
        const newChat = await this.chatRepository.createPrivateChat([
            user,
            contact,
        ]);
        pubSub.publish('newChatCreated', {
            newChatCreated: newChat,
        });
        return newChat;
    }

    async getChats(user: User) {
        const userMatch = await this.usersRepository.findOne({
            relations: ['chats'],
            where: { id: user.id },
        });

        return userMatch.chats;
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
                );
                return await this.sendMessageToChat(user, {
                    chatId: Number(chat.id),
                    contactId: input.contactId,
                    message: input.message,
                });
            }
        }
        const message = await this.sendMessageToChat(user, input);

        pubSub.publish('messageSent', {
            messageSent: message,
        });

        return message;
    }

    async sendMessageToChat(user: User, input: SendMessageInput) {
        const message = await this.chatRepository.sendMessage(user, input);
        return message;
    }

    async getPrivateChat(user: User, userId: number) {
        console.log(
            '🚀 ~ file: chat.service.ts ~ line 74 ~ ChatService ~ getPrivateChat ~ userId',
            userId,
        );
        console.log(
            '🚀 ~ file: chat.service.ts ~ line 74 ~ ChatService ~ getPrivateChat ~ user',
            user,
        );
        const chats = await this.getChats(user);
        const matchingChat = chats.find((chat) =>
            Boolean(chat.users.find((chatUser) => chatUser.id === userId)),
        );
        return matchingChat;
    }

    // SUBSCRIPTIONS
    messageSent() {
        return pubSub.asyncIterator('messageSent');
    }

    newChatCreated() {
        return pubSub.asyncIterator('newChatCreated');
    }
}
