import { PartialType } from '@nestjs/mapped-types'
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsPhoneNumber,
	IsString,
	IsUrl,
	Max,
	MaxLength,
	MinLength
} from 'class-validator'
import { User } from 'generated/prisma'

export class GroupDto {
	@IsNotEmpty({ message: 'Название сообщества обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@IsNotEmpty({ message: 'Категория группы должна быть строкой' })
	@IsString({ message: 'Категория должна быть строкой!' })
	@MaxLength(50, { message: 'Максимальное количество символов - 20' })
	type: string
}

export class EditGroupDto {
	@IsOptional()
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@IsOptional()
	@IsString({ message: 'Категория должна быть строкой!' })
	@MinLength(3, {
		message: 'Минмальное количество символов у категории сообщества - 3'
	})
	@MaxLength(20, { message: 'Максимальное количество символов - 20' })
	type: string

	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	description?: string

	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	phone?: string

	@IsOptional()
	@IsString({ message: 'Почта обязательна!' })
	email?: string

	@IsOptional()
	website?: string

	@IsOptional()
	address?: string

	admins?: string[]
}

export class PartialEditGroupDto extends PartialType(EditGroupDto) {}
