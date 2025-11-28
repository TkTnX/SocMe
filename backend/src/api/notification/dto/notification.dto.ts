import { IsNotEmpty, IsString } from "class-validator";





export class NotificationDto {
    @IsNotEmpty({message: "Заголовок не может быть пустым"})
	@IsString({ message: 'Заголовок должен быть строкой' })
	title: string

	content?: string
	icon?: string

	@IsNotEmpty({ message: 'ID Пользователя не может быть пустым' })
	@IsString({ message: 'ID Пользователя должно быть строкой' })
	userId: string
}