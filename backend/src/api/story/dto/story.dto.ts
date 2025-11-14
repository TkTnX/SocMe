import { IsNotEmpty } from "class-validator";

export class StoryDto {
    text: string

    @IsNotEmpty({message: "Изображение обязательно!"})
    image: string
}