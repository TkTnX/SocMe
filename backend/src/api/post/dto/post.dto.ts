import { IsNotEmpty, IsOptional } from "class-validator";

export class PostDto {
    @IsNotEmpty({ message: "Текст обязателен!" })
    text: string

    @IsOptional()
    image: string


}