import { UseGuards } from '@nestjs/common';
import {
    Mutation,
    Resolver,
    Subscription,
    Query,
    Args,
    Int,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatModel } from './models/chat.model';
import { MessageModel } from './models/message.model';

const pubSub = new PubSub();

@Resolver()
@UseGuards(JwtAuthGuard)
export class ChatResolver {
    constructor(private chatService: ChatService) {}

    @Mutation(() => ChatModel)
    async createPrivateChat(
        @GetUser() user: User,
        @Args({ name: 'contactId', type: () => Int }) contactId: number,
    ) {
        return await this.chatService.createPrivateChat(user, contactId);
    }

    @Query(() => [ChatModel])
    async chats(@GetUser() user: User) {
        return await this.chatService.getChats(user);
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
        const message = await this.chatService.sendMessage(user, input);
        pubSub.publish('messageSent', {
            messageSent: message,
        });
        return message;
    }
}
