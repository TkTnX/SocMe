import {
	IsArray,
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	MinLength
} from 'class-validator'

export class EditProfileDto {
	@IsNotEmpty({ message: 'Имя обязательно!' })
	@MinLength(3, { message: 'Минимальная длина имени профиля - 3 символа' })
	name: string

	@IsNotEmpty({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Почта обязательна!' })
	email: string

	@IsNotEmpty({ message: 'Пароль обязателен!' })
	@MinLength(6, { message: 'Минимальная длина пароля - 6 символов' })
	password: string

	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	bio: string

	@IsOptional()
	@IsArray({ each: true })
	@IsString({ message: 'URL Должны быть строками' })
	websites: string[]

	@IsOptional()
	@IsString({ message: 'Работа/хобби должно быть строкой!' })
	@MaxLength(15, { message: 'Максимум 15 символов' })
	hobby: string
}
