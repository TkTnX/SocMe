import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl, Max } from 'class-validator';





export class GroupDto {
	@IsNotEmpty({ message: 'Название сообщества обязательно!' })
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@IsNotEmpty({ message: 'Категория группы должна быть строкой' })
	@IsString({ message: 'Категория должна быть строкой!' })
	@Max(20, { message: 'Максимальное количество символов - 20' })
	type: string

}

export class EditGroupDto {
	@IsOptional()
	@IsString({ message: 'Название должно быть строкой!' })
	name: string

	@IsOptional()
	@IsString({ message: 'Категория должна быть строкой!' })
	@Max(20, { message: 'Максимальное количество символов - 20' })
	type: string

	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	@Max(500, { message: 'Максимальное количество символов - 500' })
	description?: string

	@IsOptional()
	@IsString({ message: 'Описание должно быть строкой' })
	@IsPhoneNumber('RU', { message: 'Номер телефона не подходит' })
	phone?: string

	@IsOptional()
	@IsString({ message: 'Почта обязательна!' })
	@IsEmail({}, { message: 'Почта некорректна' })
	email?: string

	@IsOptional()
	@IsUrl({}, { message: 'URL некорректный' })
	website?: string

	@IsOptional()
    address?: string
    
    admins?: string[]
}