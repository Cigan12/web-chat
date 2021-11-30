import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
    @Field()
    login: string;

    @Field()
    password: string;
}
