import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignInInput } from './inputs/signin.input';
import { SignUpInput } from './inputs/signup.input';
import { UsersRepository } from './repositories/users.repository';

@Resolver()
export class AuthResolver {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    @Mutation(() => Boolean)
    async signup(@Args('signUpInput') signUpInput: SignUpInput) {
        await this.usersRepository.signup(signUpInput);
        return true;
    }

    @UseGuards(JwtAuthGuard)
    @Mutation(() => Boolean)
    test() {
        return true;
    }

    @Mutation(() => Boolean)
    async signin(
        @Context() context,
        @Args('signInInput') signInInput: SignInInput,
    ) {
        console.log(
            '🚀 ~ file: auth.resolver.ts ~ line 27 ~ AuthResolver ~ context',
            process.env.ACCESS_TOKEN_SECRET,
        );
        await this.usersRepository.signin(signInInput);
        context.res.cookie(
            'access_token',
            this.jwtService.sign({
                login: signInInput.login,
            }),
            {
                httpOnly: true,
                maxAge: 1000 * 6,
            },
        );

        return true;
    }
}
