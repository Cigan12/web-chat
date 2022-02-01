import { EntityRepository, Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { IRefreshTokenDto } from '../types/refresh-token.dto';

@EntityRepository(Token)
export class TokensRepository extends Repository<Token> {
    async createToken(refreshDTO: IRefreshTokenDto) {
        const existingToken = await this.findOne({
            where: {
                deviceUUID: refreshDTO.deviceUUID,
                userId: refreshDTO.userId,
            },
        });
        if (!existingToken) {
            const token = new Token();
            token.deviceUUID = refreshDTO.deviceUUID;
            token.userId = refreshDTO.userId;
            token.tokenUUID = refreshDTO.tokenUUID;

            return await token.save();
        } else {
            existingToken.tokenUUID = refreshDTO.tokenUUID;
            return await existingToken.save();
        }
    }
}
