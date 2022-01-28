import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Subscription, Query, Args } from '@nestjs/graphql';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { SendMessageInput } from './inputs/send-message.input';
import { ChatModel } from './models/chat.model';

@Resolver()
export class ChatResolver {
    constructor(private chatService: ChatService) {}

    @UseGuards(JwtAuthGuard)
    @Query(() => [ChatModel])
    async chats(
        @GetUser() user: User,
        @Args('search', { nullable: true }) search?: string,
    ) {
        return await this.chatService.getChats(user, search);
    }

    @UseGuards(JwtAuthGuard)
    @Subscription(() => ChatModel, {
        filter: (payload, value, context) => {
            if (context?.req?.user) {
                const currentUser = context?.req?.user;
                return (
                    Boolean(
                        payload.newChatCreated.users.find(
                            (user) => currentUser.id === user.id,
                        ),
                    ) && payload.newChatCreated.name != currentUser.username
                );
            }
            return false;
        },
    })
    newChatCreated() {
        return this.chatService.newChatCreated();
    }

    @UseGuards(JwtAuthGuard)
    @Subscription(() => ChatModel, {
        filter: (payload, value, context) => {
            if (context?.req?.user) {
                const currentUser = context?.req?.user;
                return (
                    Boolean(
                        payload.chatUpdated.users.find(
                            (user) => currentUser.id === user.id,
                        ),
                    ) && payload.chatUpdated.name != currentUser.username
                );
            }
            return false;
        },
    })
    chatUpdated() {
        return this.chatService.chatUpdated();
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    async sendMessage(
        @GetUser() user: User,
        @Args({ name: 'input', type: () => SendMessageInput })
        input: SendMessageInput,
    ) {
        const chat = await this.chatService.sendMessage(user, input);

        return Boolean(chat);
    }
}
