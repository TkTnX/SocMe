import { ApiProperty } from '@nestjs/swagger'

export class UserResponseDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string
	@ApiProperty()
	email: string
	@ApiProperty()
	password?: string

	@ApiProperty()
	bio?: string
	@ApiProperty()
	websites: string[]
	@ApiProperty()
	hobby?: string
	@ApiProperty()
	avatar?: string
	@ApiProperty()
	cover?: string
	@ApiProperty()
	gender?: string
	@ApiProperty()
	city?: string
	@ApiProperty()
	birthdayDate?: string

	@ApiProperty()
	provider?: string
	@ApiProperty()
	createdAt?: string
}
