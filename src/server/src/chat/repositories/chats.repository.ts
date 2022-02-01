import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { Message } from '../entities/message.entity';
import { SendMessageInput } from '../inputs/send-message.input';
import { EChatTypes } from '../types/chat-types.enum';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> {
    async createPrivateChat(
        users: User[],
        message: SendMessageInput['message'],
        user: User,
    ) {
        const chat = new Chat();
        chat.type = EChatTypes.private;
        chat.users = users;
        const newMessage = new Message();
        newMessage.user = user;
        newMessage.date = new Date();
        newMessage.message = message;
        console.log(
            '🚀 ~ file: chats.repository.ts ~ line 22 ~ ChatRepository ~ newMessage',
            newMessage,
        );

        chat.messages = [newMessage];
        console.log(
            '🚀 ~ file: chats.repository.ts ~ line 29 ~ ChatRepository ~ chat',
            chat,
        );
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
        return await chat.save();
    }
}
