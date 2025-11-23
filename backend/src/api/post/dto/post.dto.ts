import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class PostDto {
	@ApiProperty({
		required: true,
		type: 'string',
		example: 'Lorem ipsum....'
	})
	@IsNotEmpty({ message: 'Текст обязателен!' })
	text: string

	@ApiProperty({
		required: true,
		type: 'string',
		example: 'https://localhost:5000/uploads/...'
	})
	@IsOptional()
	image: string

	@ApiProperty({
		required: true,
		example: ['one', 'two', 'three'],
		type: 'array'
	})
	@IsOptional()
	@IsArray({ message: 'Значение должно быть массивом' })
	@IsString({ each: true, message: 'Значения массива должны быть строкой' })
	hashtags: string[]
}
