import { DynamicModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { UsersRepository } from './repositories/users.repository';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({})
export class AuthModule {
    static forRoot(): DynamicModule {
        return {
            imports: [
                ConfigModule,
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                    secret: process.env.ACCESS_TOKEN_SECRET,
                    signOptions: {
                        expiresIn: 1000 * 60,
                    },
                }),
                TypeOrmModule.forFeature([UsersRepository]),
            ],
            providers: [AuthResolver, JwtStrategy],
            module: AuthModule,
        };
    }
}
