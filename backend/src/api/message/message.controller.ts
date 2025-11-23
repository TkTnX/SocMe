import { Body, Controller, Delete, Param, Post } from '@nestjs/common'
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags
} from '@nestjs/swagger'
import { MessageDto, MessageResponseDto } from 'src/api/message/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { MessageService } from './message.service'

@Controller('messages')
@ApiTags('Messages')
export class MessageController {
	constructor(private readonly messageService: MessageService) {}

	@Protected()
	@Post()
	@ApiCreatedResponse({ type: MessageResponseDto })
	@ApiBody({ type: MessageDto })
	public async create(
		@Body() dto: MessageDto,
		@Authorized('userId') userId: string
	) {
		return await this.messageService.create(dto, userId)
	}

	@Protected()
	@Delete(':messageId')
	@ApiOkResponse({ type: MessageDto })
	public async delete(
		@Body() dto: { messageId: string },
		@Authorized('userId') userId: string
	) {
		return await this.messageService.delete(dto.messageId, userId)
	}
}
