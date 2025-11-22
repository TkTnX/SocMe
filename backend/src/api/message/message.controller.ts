import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import { MessageDto } from 'src/api/message/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { MessageService } from './message.service'

@Controller('messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Protected()
	@Post()
	public async create(
		@Body() dto: MessageDto,
		@Authorized('userId') userId: string
	) {
		return await this.messageService.create(dto, userId)
	}

	@Protected()
	@Delete(':messageId')
	public async delete(
		@Body() dto: { messageId: string },
		@Authorized('userId') userId: string
	) {
		return await this.messageService.delete(dto.messageId, userId)
	}
}
