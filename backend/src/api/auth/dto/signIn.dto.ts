import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class SignInDto {

	@IsNotEmpty({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Почта обязательна!' })
	email: string

	@IsNotEmpty({ message: 'Пароль обязателен!' })
	@MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
	password: string
}
