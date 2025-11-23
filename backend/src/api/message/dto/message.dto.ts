import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

export class MessageDto {
	@ApiProperty({ type: 'string', required: true, example: 'Lorem ipsum...' })
	text: string

	@ApiProperty({ type: 'string', example: 'http://localhost:5000/uploads' })
	image?: string
	@ApiProperty({
		type: 'string',
		required: true,
		example: '544g43f23f324-5gfe234fdj5-3f3f34'
	})
	chatId: string
}

export class PartialMessageDto extends PartialType(MessageDto) {
	messageId: string
}
