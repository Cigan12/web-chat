import {
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInput } from './inputs/signin.input';
import { SignUpInput } from './inputs/signup.input';
import { UsersRepository } from './repositories/users.repository';
import { TokensService } from './tokens.service';
import { v4 as uuidv4 } from 'uuid';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GetToken } from './decorators/get-token.decorator';
import { Token } from './entities/token.entity';
import { TokensModel } from './models/tokens.model';
import { UserModel } from './models/user.model';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Resolver()
export class AuthResolver {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private tokensService: TokensService,
        private mailer: MailerService,
    ) {}

    @Mutation(() => Boolean)
    async signup(@Args('signUpInput') signUpInput: SignUpInput) {
        const user = await this.usersRepository.signup(signUpInput);
        if (user) {
            const emailToken = this.tokensService.generateEmailVerifyToken(
                user.id,
            );
            await this.mailer.sendEmail({
                subject: 'Подтверждение email адреса',
                to: user.email,
                text: `Подтвердите свой email адрес http://localhost:3000/?token=${emailToken}`,
            });
        }
        return true;
    }

    @UseGuards(JwtRefreshGuard)
    @Mutation(() => TokensModel)
    async refresh(@GetToken() token: Token, @Context() context) {
        if (context.req.cookies.uuid !== token.deviceUUID) {
            throw new UnauthorizedException();
        }

        const { accessToken, refreshToken } =
            await this.tokensService.generateTokens(
                token.deviceUUID,
                token.userId,
            );

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    @Mutation(() => TokensModel)
    async signin(
        @Context() context,
        @Args('signInInput') signInInput: SignInInput,
    ) {
        const user = await this.usersRepository.signin(signInInput);
        if (!user.is_verified) {
            throw new ForbiddenException('Необходимо подтвердить email адрес');
        }

        const uniqDeviceId = context.req.cookies.uuid
            ? context.req.cookies.uuid
            : uuidv4();

        const { accessToken, refreshToken } =
            await this.tokensService.generateTokens(uniqDeviceId, user.id);

        context.res.cookie('uuid', uniqDeviceId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    @Mutation(() => TokensModel)
    async verifyEmail(@Context() context, @Args('token') token: string) {
        const decodedToken = this.tokensService.verifyToken(
            token,
            process.env.EMAIL_TOKEN_SECRET,
        );

        const uniqDeviceId = context.req.cookies.uuid
            ? context.req.cookies.uuid
            : uuidv4();

        context.res.cookie('uuid', uniqDeviceId, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        if (typeof decodedToken === 'object') {
            const currentUser = await this.usersRepository.findOne(
                decodedToken.userid,
            );

            if (currentUser && !currentUser.is_verified) {
                await this.usersRepository.verifyUser(currentUser.id);
                const { accessToken, refreshToken } =
                    await this.tokensService.generateTokens(
                        uniqDeviceId,
                        decodedToken.userid,
                    );
                return {
                    access_token: accessToken,
                    refresh_token: refreshToken,
                };
            } else {
                throw new InternalServerErrorException('Что-то пошло не так');
            }
        } else {
            throw new InternalServerErrorException('Что-то пошло не так');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Query(() => UserModel)
    async getUser(@GetUser() user: User) {
        return user;
    }
}
