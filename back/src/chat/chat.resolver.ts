import { Mutation, Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
    @Query(() => String)
    get() {
        return 'test';
    }

    @Subscription(() => String)
    messageAdded() {
        return pubSub.asyncIterator('messageAdded');
    }

    @Mutation(() => String)
    addMessage() {
        pubSub.publish('messageAdded', {
            messageAdded: 'new Message',
        });
        return 'new Message';
    }
}
