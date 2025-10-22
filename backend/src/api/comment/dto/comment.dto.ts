import {  IsString } from "class-validator";

export class CommentDto {
    @IsString({message: "Комментарий должен быть строкой"})
    text: string

    
    image?: string
}