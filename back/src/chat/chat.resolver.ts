import { UseGuards } from '@nestjs/common';
import {
    Mutation,
    Resolver,
    Subscription,
    Query,
    Args,
    Int,
} from '@nestjs/graphql';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatModel } from './models/chat.model';
import { MessageModel } from './models/message.model';

@Resolver()
export class ChatResolver {
    constructor(private chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Mutation(() => ChatModel)
    async createPrivateChat(
        @GetUser() user: User,
        @Args({ name: 'contactId', type: () => Int }) contactId: number,
    ) {
        return await this.chatService.createPrivateChat(user, contactId);
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => [ChatModel])
    async chats(@GetUser() user: User) {
        return await this.chatService.getChats(user);
    }

    @Subscription(() => MessageModel)
    messageSent() {
        return this.chatService.messageSent();
    }

    @Subscription(() => ChatModel)
    newChatCreated() {
        return this.chatService.newChatCreated();
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => MessageModel)
    async sendMessage(
        @GetUser() user: User,
        @Args({ name: 'input', type: () => SendMessageInput })
        input: SendMessageInput,
    ) {
        const message = await this.chatService.sendMessage(user, input);

        return message;
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => ChatModel, {
        nullable: true,
    })
    async privateChat(
        @GetUser() user: User,
        @Args({ name: 'contactId', type: () => Int })
        contactId: number,
    ) {
        return await this.chatService.getPrivateChat(user, contactId);
    }
}
