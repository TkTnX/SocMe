import { Controller, Delete, Get, Param, Post, Res } from '@nestjs/common';
import { Authorized, Protected } from 'src/common/decorators';



import { ChatService } from './chat.service';
import { Response } from 'express';





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
	public async getChat(
		@Param('chatId') chatId: string,
		@Authorized('userId') userId: string,
	) {
		return await this.chatService.getChat(chatId, userId)
	}

	@Protected()
	@Post(':profileId')
	public async createChat(
		@Param('profileId') profileId: string,
		@Authorized('userId') userId: string
	) {
		return await this.chatService.createChat(profileId, userId)
	}

	@Protected()
	@Delete(':chatId')
	public async deleteChat(@Param('chatId') chatId: string, @Authorized('userId') userId: string) {
		return await this.chatService.deleteChat(chatId, userId)
	}
}