import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInput } from './inputs/signin.input';
import { SignUpInput } from './inputs/signup.input';
import { UserModel } from './models/user.model';
import { UsersRepository } from './repositories/users.repository';
import { TokensService } from './tokens.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GetToken } from './decorators/get-token.decorator';
import { Token } from './entities/token.entity';

@Resolver()
export class AuthResolver {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private tokensService: TokensService,
    ) {}

    @Mutation(() => Boolean)
    async signup(@Args('signUpInput') signUpInput: SignUpInput) {
        await this.usersRepository.signup(signUpInput);
        return true;
    }

    @UseGuards(JwtRefreshGuard)
    @Mutation(() => Boolean)
    async refresh(@GetToken() token: Token, @Context() context) {
        if (context.req.cookies.uuid !== token.deviceUUID) {
            throw new UnauthorizedException();
        }

        const { accessToken, refreshToken } =
            await this.tokensService.generateTokens(
                token.deviceUUID,
                token.userId,
            );

        context.res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES) * 1000,
        });

        context.res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES) * 1000,
        });
        return true;
    }

    @Mutation(() => UserModel)
    async signin(
        @Context() context,
        @Args('signInInput') signInInput: SignInInput,
    ) {
        const user = await this.usersRepository.signin(signInInput);

        const uniqDeviceId = context.req.cookies.uuid
            ? context.req.cookies.uuid
            : uuidv4();

        const { accessToken, refreshToken } =
            await this.tokensService.generateTokens(uniqDeviceId, user.id);

        context.res.cookie('access_token', accessToken, {
            httpOnly: true,
            maxAge: Number(process.env.ACCESS_TOKEN_EXPIRES) * 1000,
        });

        context.res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES) * 1000,
        });

        context.res.cookie('uuid', uniqDeviceId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        return user;
    }
}
