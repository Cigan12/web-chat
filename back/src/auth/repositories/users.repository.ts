import { EntityRepository, Like, Not, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpInput } from '../inputs/signup.input';
import * as bcrypt from 'bcrypt';
import { SignInInput } from '../inputs/signin.input';
import {
    ConflictException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async signup(credentials: SignUpInput) {
        const { password, email, username } = credentials;
        const user = new User();
        const salt = await bcrypt.genSalt();
        const hashPasword = await bcrypt.hash(password, salt);

        user.email = email;
        user.username = username;
        user.password = hashPasword;
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(
                    'User with this email or username already exist',
                );
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signin(credentials: SignInInput) {
        const { password, login } = credentials;
        try {
            const User = await this.findOne({
                where: [{ email: login }, { username: login }],
            });

            const compare = await bcrypt.compare(password, User.password);
            if (compare) {
                const userWithoutPassword = User;
                delete userWithoutPassword.password;
                return userWithoutPassword;
            } else {
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async findUserByUserName(user: User, username?: string) {
        // FOR AN UNDEFINED CASE RETURN EMPTY
        if (!username) {
            return [];
        }

        if (username.length < 2) {
            return [];
        }
        const users = await this.find({
            where: [
                {
                    username: Like(`%${username}%`),
                    id: Not(user.id),
                },
            ],
        });
        return users;
    }
}
