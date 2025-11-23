import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ChatResponseDto } from 'src/api/chat/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { ChatService } from './chat.service'

@Controller('chats')
@ApiTags('Chats')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Protected()
	@Get()
	@ApiOkResponse({ type: [ChatResponseDto] })
	public async getChats(@Authorized('userId') userId: string) {
		return await this.chatService.getChats(userId)
	}

	@Protected()
	@Get(':chatId')
	@ApiOkResponse({ type: ChatResponseDto })
	public async getChat(
		@Param('chatId') chatId: string,
		@Authorized('userId') userId: string
	) {
		return await this.chatService.getChat(chatId, userId)
	}

	@Protected()
	@Post(':profileId')
	@ApiCreatedResponse({ type: ChatResponseDto })
	public async createChat(
		@Param('profileId') profileId: string,
		@Authorized('userId') userId: string
	) {
		return await this.chatService.createChat(profileId, userId)
	}

	@Protected()
	@Delete(':chatId')
	@ApiOkResponse({ type: ChatResponseDto })
	public async deleteChat(
		@Param('chatId') chatId: string,
		@Authorized('userId') userId: string
	) {
		return await this.chatService.deleteChat(chatId, userId)
	}
}
