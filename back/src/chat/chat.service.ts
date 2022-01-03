import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatRepository } from './repositories/chats.repository';

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

        return await this.chatRepository.createPrivateChat([user, contact]);
    }

    async getChats(user: User) {
        const userMatch = await this.usersRepository.findOne({
            relations: ['chats'],
            where: { id: user.id },
        });

        return userMatch.chats;
    }

    async sendMessage(user: User, input: SendMessageInput) {
        if (!input.chatId && input.contactId) {
            const chat = await this.createPrivateChat(user, input.contactId);
            return await this.sendMessageToChat(user, {
                chatId: chat.id,
                contactId: input.contactId,
                message: input.message,
            });
        }
        return await this.sendMessageToChat(user, input);
    }

    async sendMessageToChat(user: User, input: SendMessageInput) {
        const message = await this.chatRepository.sendMessage(user, input);
        return message;
    }
}
