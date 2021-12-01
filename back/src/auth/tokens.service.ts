import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInput } from './inputs/signin.input';
import { TokensRepository } from './repositories/tokens.repository';
import { UsersRepository } from './repositories/users.repository';
import { IJwtPayload } from './types/jwt-payload.interface';
import { IJwtRefreshPayload } from './types/jwt-refresh-payload.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TokensService {
    constructor(
        @InjectRepository(TokensRepository)
        private tokensRepository: TokensRepository,
        private jwtService: JwtService,
    ) {}

    getAccessToken(payload: IJwtPayload): string {
        return this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
        });
    }

    async getRefreshToken(payload: IJwtRefreshPayload): Promise<string> {
        const refresh = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
        });

        await this.tokensRepository.createToken({
            deviceUUID: payload.deviceUUID,
            userId: payload.userId,
            tokenUUID: payload.tokenUUID,
        });

        return refresh;
    }

    async generateTokens(deviceUUID: string, userId: number) {
        const tokenUUID = uuidv4();
        const accessToken = this.getAccessToken({
            userId,
        });

        const refreshToken = await this.getRefreshToken({
            deviceUUID,
            userId,
            tokenUUID,
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
