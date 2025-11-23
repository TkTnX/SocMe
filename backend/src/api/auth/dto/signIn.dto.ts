import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';





export class SignInDto {
	@ApiProperty({
		type: 'string',
		example: 'test@example.com',
		required: true
	})
	@IsNotEmpty({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Почта обязательна!' })
	email: string

	@ApiProperty({
		type: 'string',
		example: '******',
		required: true
	})
	@IsNotEmpty({ message: 'Пароль обязателен!' })
	@MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
	password: string
}