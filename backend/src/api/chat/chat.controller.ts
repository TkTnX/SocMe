import { Controller, Get, Param, Post } from '@nestjs/common'
import { Authorized, Protected } from 'src/common/decorators'

import { ChatService } from './chat.service'

@Controller('chats')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Protected()
	@Get()
	public async getChats(@Authorized('userId') userId: string) {
		return await this.chatService.getChats(userId)
	}

	@Protected()
	@Get(':chatId')
	public async getChat(@Param('chatId') chatId: string) {
		return await this.chatService.getChat(chatId)
  }
  

  @Protected()
  @Post(":profileId")
  public async createChat(@Param("profileId") profileId: string, @Authorized("userId") userId: string) {
    return await this.chatService.createChat(profileId, userId)
  }
}
