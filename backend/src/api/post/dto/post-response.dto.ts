import { ApiProperty } from '@nestjs/swagger'

export class PostResponseDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	images: string[]

	@ApiProperty()
	userId: string

	@ApiProperty()
	groupId?: string

	@ApiProperty()
	createdAt: string
	@ApiProperty()
	updatedAt: string
}
