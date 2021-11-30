import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { RequestWithCookies } from 'src/types/Request.interface';

const cookieExtractor = (req: RequestWithCookies) => {
    return req.cookies.access_token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: cookieExtractor,
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: any) {
        console.log('pl', payload);
        return { test: 'string' };
    }
}
