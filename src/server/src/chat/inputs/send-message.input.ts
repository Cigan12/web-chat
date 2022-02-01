import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
    @Field(() => Int, { nullable: true })
    chatId: number;

    @Field(() => Int, { nullable: true })
    contactId: number;

    @Field(() => String)
    message: string;
}
