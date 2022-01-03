import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
    @Field(() => String, { nullable: true })
    chatId: string;

    @Field(() => Int, { nullable: true })
    contactId: number;

    @Field(() => String)
    message: string;
}
