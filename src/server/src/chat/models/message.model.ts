import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { UserModel } from 'src/auth/models/user.model';

@ObjectType()
export class MessageModel {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    date: string;

    @Field(() => String)
    message: string;

    @Field(() => UserModel)
    user: User;
}
