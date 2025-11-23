import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CommentDto {
	@ApiProperty({
		type: 'string',
		required: true,
		example: 'Lorem ipsum...'
	})
	@IsString({ message: 'Комментарий должен быть строкой' })
	text: string

	@ApiProperty({
		type: 'string',

		example: '435ffh-2f23f45hvjh-21'
	})
	replyToId: string | null

	@ApiProperty({
		type: 'string',
		example: 'http://localhost:5000/uploads/...'
	})
	image?: string
}
