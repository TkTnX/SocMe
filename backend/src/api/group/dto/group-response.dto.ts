import { ApiProperty } from '@nestjs/swagger';





export class GroupResponseDto {
	@ApiProperty()
	id: string

	@ApiProperty()
	name: string

	@ApiProperty()
	avatar?: string

	@ApiProperty()
	cover?: string

	@ApiProperty()
	type: string

	@ApiProperty()
	description?: string

	@ApiProperty()
	phone?: string

	@ApiProperty()
	email?: string

	@ApiProperty()
	website?: string

	@ApiProperty()
    address?: string
    
    
}