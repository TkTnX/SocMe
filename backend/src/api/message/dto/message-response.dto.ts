import { ApiProperty } from '@nestjs/swagger'

export class MessageResponseDto {
	@ApiProperty()
	id: string
	@ApiProperty()
	text: string
	@ApiProperty()
	image?: string
	@ApiProperty()
	userId: string
	@ApiProperty()
	chatId: string
	@ApiProperty()
	createdAt: string
	@ApiProperty()
	updatedAt?: string
}
