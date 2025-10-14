import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PostDto {
	@IsNotEmpty({ message: 'Текст обязателен!' })
	text: string

	@IsOptional()
	image: string

	@IsOptional()
	@IsArray({ message: 'Значение должно быть массивом' })
	@IsString({ each: true, message: 'Значения массива должны быть строкой' })
	hashtags: string[]
}
