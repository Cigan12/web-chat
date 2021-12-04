import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
    @Field(() => Int)
    chatId: number;

    @Field(() => String)
    message: string;
}
