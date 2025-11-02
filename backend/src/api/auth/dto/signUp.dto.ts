import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { EGender } from 'generated/prisma'

export class SignUpDto {
	@IsNotEmpty({ message: 'Имя обязательно!' })
	@MinLength(3, { message: 'Минимальная длина имени профиля - 3 символа' })
	name: string

	@IsNotEmpty({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Почта обязательна!' })
	email: string

	@IsNotEmpty({ message: 'Пароль обязателен!' })
	@MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
	password: string

	@IsNotEmpty({message: "Пол обязателен!"})
	gender: EGender
}
