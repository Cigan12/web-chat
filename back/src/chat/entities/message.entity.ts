import { User } from 'src/auth/entities/user.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.messages, {
        eager: true,
    })
    user: User;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat;
}
