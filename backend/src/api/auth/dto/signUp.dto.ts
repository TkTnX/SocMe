import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { EGender } from 'generated/prisma';





export class SignUpDto {
	@ApiProperty({
		type: 'string',
		example: 'John Doe',
		required: true
	})
	@IsNotEmpty({ message: 'Имя обязательно!' })
	@MinLength(3, { message: 'Минимальная длина имени профиля - 3 символа' })
	name: string

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

	@ApiProperty({
		type: 'string',
		example: 'MALE',
		required: true
	})
	@IsNotEmpty({ message: 'Пол обязателен!' })
	gender: EGender
}