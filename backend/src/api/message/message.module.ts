import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UserService } from 'src/api/user/user.service';
import { ChatService } from 'src/api/chat/chat.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, UserService, ChatService],
})
export class MessageModule {}
