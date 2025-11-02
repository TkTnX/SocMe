import { PartialType } from '@nestjs/mapped-types'
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

	@IsOptional()
	password: string

	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	bio: string

	@IsOptional()
	@IsArray()
	websites: string[]

	@IsOptional()
	@IsString({ message: 'Работа/хобби должно быть строкой!' })
	@MaxLength(15, { message: 'Максимум 15 символов' })
	hobby: string

	@IsOptional()
	@IsString({ message: 'Дата рождения должна быть строкой' })
	birthdayDate: string
}

export class PartialEditProfileDto extends PartialType(EditProfileDto) {}
