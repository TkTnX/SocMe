import {  IsString } from "class-validator";

export class CommentDto {
    @IsString({message: "Комментарий должен быть строкой"})
    text: string

    replyToId: string | null
    
    image?: string
}