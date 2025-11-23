import { ApiProperty } from '@nestjs/swagger'

export class CommentResponseDto {
	@ApiProperty({
		type: 'string',
		required: true,
		example: '435ffh-2f23f45hvjh-21'
	})
	id: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '435ffh-2f23f45hvjh-21'
	})
	postId: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '435ffh-2f23f45hvjh-21'
	})
	userId: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: 'Lorem ipsum...'
	})
	text: string

	@ApiProperty({
		type: 'string',
		example: 'http://localhost:5000/uploads/...'
	})
	image?: string
	@ApiProperty({
		type: 'string',

		example: '435ffh-2f23f45hvjh-21'
	})
	replyToId?: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '2025-11-22 18:46:38.043'
	})
	createdAt: string

	@ApiProperty({
		type: 'string',
		example: '2025-11-22 18:46:38.043'
	})
	updatedAt?: string
}
