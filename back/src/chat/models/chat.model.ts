import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from 'src/auth/models/user.model';
import { Message } from '../entities/message.entity';
import { EChatTypes } from '../types/chat-types.enum';
import { MessageModel } from './message.model';

@ObjectType()
export class ChatModel {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    type: EChatTypes;

    @Field(() => [MessageModel])
    messages: Message[];

    @Field(() => [UserModel])
    users: UserModel[];
}
