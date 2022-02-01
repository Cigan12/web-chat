import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetToken = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);

        return ctx.getArgByIndex(2).req.user;
    },
);
