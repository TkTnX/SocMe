import { ApiProperty } from '@nestjs/swagger'

export class LikeResponseDto {
	@ApiProperty({
		type: 'string',
		required: true,
		example: '4334gdfsd3-f3434f34'
	})
	id: string

	@ApiProperty({ type: 'string', required: true, example: 'POST' })
	type: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '4334gdfsd3-f3434f34'
	})
	userId: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '4334gdfsd3-f3434f34'
	})
	postId: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '4334gdfsd3-f3434f34'
	})
	commentId: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: '2025-11-22 18:46:38.043'
	})
	createdAt: string
}
