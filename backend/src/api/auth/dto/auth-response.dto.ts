import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
	@ApiProperty({
		type: 'string',
		required: true,
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOi...'
	})
	access_token: string
}
