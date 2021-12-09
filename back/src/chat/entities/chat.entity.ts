import { User } from 'src/auth/entities/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { EChatTypes } from '../types/chat-types.enum';
import { Message } from './message.entity';

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: EChatTypes;

    @ManyToMany(() => User, (user) => user.chats, {
        eager: true,
    })
    users: User[];

    @OneToMany(() => Message, (message) => message.chat, {
        cascade: true,
        eager: true,
    })
    messages: Message[];
}