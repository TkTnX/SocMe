import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl, Max, MaxLength, MinLength } from 'class-validator';
import { User } from 'generated/prisma';





export class GroupDto {
	@ApiProperty({
		type: 'string',
		example: 'The best group in the world',
		required: true
	})
	@IsNotEmpty({ message: 'Название сообщества обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@ApiProperty({
		type: 'string',
		example: 'Развлечения',
		required: true
	})
	@IsNotEmpty({ message: 'Категория группы должна быть строкой' })
	@IsString({ message: 'Категория должна быть строкой!' })
	@MaxLength(50, { message: 'Максимальное количество символов - 20' })
	type: string
}

export class EditGroupDto {
	@ApiProperty({
		type: 'string',
		example: 'The best group in the world',
		required: true
	})
	@IsOptional()
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@ApiProperty({
		type: 'string',
		example: 'Развлечения',
		required: true
	})
	@IsOptional()
	@IsString({ message: 'Категория должна быть строкой!' })
	@MinLength(3, {
		message: 'Минмальное количество символов у категории сообщества - 3'
	})
	@MaxLength(20, { message: 'Максимальное количество символов - 20' })
	type: string

	@ApiProperty({
		type: 'string',
		example: 'Lorem ipsum...'
	})
	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	description?: string

	@ApiProperty({
		type: 'string',
		example: '+7(___) ___-__-__'
	})
	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	phone?: string

	@ApiProperty({
		type: 'string',
		example: 'test@example.com'
	})
	@IsOptional()
	@IsString({ message: 'Почта обязательна!' })
	email?: string

	@ApiProperty({
		type: 'string',
		example: 'http://localhost:5000/uploads/...'
	})
	@IsOptional()
	website?: string

	@ApiProperty({
		type: 'string',
		example: 'ул. Пушкина, д. 32'
	})
	@IsOptional()
	address?: string

	admins?: string[]
}

export class PartialEditGroupDto extends PartialType(EditGroupDto) {}