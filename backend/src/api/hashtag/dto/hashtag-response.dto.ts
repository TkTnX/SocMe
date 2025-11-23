import { ApiProperty } from '@nestjs/swagger'

export class HashtagResponseDto {
	@ApiProperty({
		type: 'string',
		required: true,
		example: '4334gdfsd3-f3434f34'
	})
	id: string

	@ApiProperty({
		type: 'string',
		required: true,
		example: 'Hashtag'
	})
	name: string

}
