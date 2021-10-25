import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TestData {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    string: string;
}
