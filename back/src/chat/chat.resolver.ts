import { UseGuards } from '@nestjs/common';
import {
    Mutation,
    Resolver,
    Subscription,
    Query,
    Args,
    Int,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatModel } from './models/chat.model';
import { MessageModel } from './models/message.model';
import { ChatRepository } from './repositories/chats.repository';

const pubSub = new PubSub();

@Resolver()
@UseGuards(JwtAuthGuard)
export class ChatResolver {
    constructor(
        @InjectRepository(ChatRepository)
        private chatRepository: ChatRepository,
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {}

    @Query(() => String)
    get() {
        return 'test';
    }

    @Mutation(() => ChatModel)
    async createPrivateChat(
        @GetUser() user: User,
        @Args({ name: 'contactId', type: () => Int }) contactId: number,
    ) {
        const contact = await this.usersRepository.findOne(contactId);

        return await this.chatRepository.createPrivateChat([user, contact]);
    }

    @Query(() => [ChatModel])
    async chats(@GetUser() user: User) {
        const userMatch = await this.usersRepository.findOne({
            relations: ['chats'],
            where: { id: user.id },
        });

        return userMatch.chats;
    }

    @Subscription(() => MessageModel)
    messageSent() {
        return pubSub.asyncIterator('messageSent');
    }

    @Mutation(() => MessageModel)
    async sendMessage(
        @GetUser() user: User,
        @Args({ name: 'input', type: () => SendMessageInput })
        input: SendMessageInput,
    ) {
        const message = await this.chatRepository.sendMessage(user, input);
        pubSub.publish('messageSent', {
            messageSent: message,
        });
        return message;
    }
}
