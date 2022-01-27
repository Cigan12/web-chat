import { Chat } from 'src/chat/entities/chat.entity';
import { Message } from 'src/chat/entities/message.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => Chat, (chat) => chat.users)
    @JoinTable()
    chats: Chat[];

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[];
}
