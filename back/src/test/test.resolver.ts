import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { TestData } from './models/test.model';

@Resolver()
export class TestResolver {
    @Query(() => TestData)
    async test(): Promise<TestData> {
        return {
            id: 1,
            string: 'hello world',
        };
    }

    @Mutation(() => Boolean)
    async toggleTest(): Promise<boolean> {
        return true;
    }
}
