import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Authorized, Protected } from 'src/common/decorators';
import { MessageDto } from 'src/api/message/dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


  @Protected()
  @Post(":chatId")
  public async create(@Param("chatId") chatId: string, @Body() dto: MessageDto, @Authorized("userId") userId:string ) {
    return await this.messageService.create(chatId, dto, userId)
  }
}
