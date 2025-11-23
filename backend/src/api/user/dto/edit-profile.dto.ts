import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
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
		example: '******'
	})
	@IsOptional()
	password: string

	@ApiProperty({
		type: 'string',
		example: 'Lorem ipsum...'
	})
	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	bio: string

	@ApiProperty({
		type: 'array',
		example: '["https://youtube.com", "https://nestjs.com]'
	})
	@IsOptional()
	@IsArray()
	websites: string[]

	@ApiProperty({
		type: 'string',
		example: 'Программирование'
	})
	@IsOptional()
	@IsString({ message: 'Работа/хобби должно быть строкой!' })
	@MaxLength(15, { message: 'Максимум 15 символов' })
	hobby: string

	@ApiProperty({
		type: 'string',
		example: '19.03.2009'
	})
	@IsOptional()
	@IsString({ message: 'Дата рождения должна быть строкой' })
	birthdayDate: string
}

export class PartialEditProfileDto extends PartialType(EditProfileDto) {}
