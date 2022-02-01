import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { UsersRepository } from './repositories/users.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokensService } from './tokens.service';
import { TokensRepository } from './repositories/tokens.repository';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { MailerService } from 'src/mailer/mailer.service';

@Module({})
export class AuthModule {
    static forRoot(): DynamicModule {
        return {
            imports: [
                ConfigModule,
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                    signOptions: {
                        expiresIn: 6,
                    },
                }),
                TypeOrmModule.forFeature([UsersRepository, TokensRepository]),
            ],
            providers: [
                AuthResolver,
                JwtStrategy,
                JwtRefreshStrategy,
                TokensService,
                MailerService,
            ],
            module: AuthModule,
        };
    }
}
