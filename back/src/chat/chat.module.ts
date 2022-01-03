import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/auth/repositories/users.repository';
import { ChatResolver } from './chat.resolver';
import { ChatRepository } from './repositories/chats.repository';
import { ChatService } from './chat.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChatRepository, UsersRepository])],
    providers: [ChatResolver, ChatService],
})
export class ChatModule {}
