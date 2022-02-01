import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-jwt';
import { Token } from '../entities/token.entity';
import { TokensRepository } from '../repositories/tokens.repository';
import { IJwtRefreshPayload } from '../types/jwt-refresh-payload.interface';
import { refreshExtractor } from '../utils/refreshExtractor.util';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        @InjectRepository(TokensRepository)
        private tokensRepository: TokensRepository,
    ) {
        super({
            jwtFromRequest: refreshExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
        });
    }

    async validate({
        deviceUUID,
        userId,
        tokenUUID,
    }: IJwtRefreshPayload): Promise<Token> {
        const token = await this.tokensRepository.findOne({
            where: {
                deviceUUID,
                userId,
                tokenUUID,
            },
        });

        if (!token) {
            throw new UnauthorizedException();
        }
        return token;
    }
}
