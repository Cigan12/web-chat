import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { SendMessageInput } from '../inputs/send-message.input';
import { EChatTypes } from '../types/chat-types.enum';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    async createPrivateChat(users: User[]) {
        console.log(
            '🚀 ~ file: chats.repository.ts ~ line 11 ~ ChatRepository ~ createPrivateChat ~ users',
            users,
        );
        const chat = new Chat();
        chat.type = EChatTypes.private;
        chat.users = users;
        return await chat.save();
    }

    async sendMessage(user: User, messageInput: SendMessageInput) {
        const chat = await this.findOne(messageInput.chatId);
        const isSenderExistInChat = chat.users.find(
            (user) => user.id === user.id,
        );
        if (!isSenderExistInChat) {
            chat.users.push(user);
        }
        const message = new Message();
        message.user = user;
        message.date = new Date();
        message.message = messageInput.message;
        chat.messages.push(message);
        await chat.save();
        return message;
    }
}
