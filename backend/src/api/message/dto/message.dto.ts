import { IsNotEmpty, IsString } from "class-validator";

export class MessageDto {
    @IsNotEmpty({message: "Текст обязателен"})
    @IsString({message: "Текст должен быть строкой"})
    text: string

    image: string
}