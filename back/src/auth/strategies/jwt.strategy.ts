import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { IJwtPayload } from '../types/jwt-payload.interface';
import { cookieExtractor } from '../utils/cookie-extractor.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({
            jwtFromRequest: cookieExtractor('access_token'),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate({ userId }: IJwtPayload): Promise<User> {
        const user = await this.usersRepository.findOne(userId);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
