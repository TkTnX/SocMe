import { ApiProperty } from "@nestjs/swagger";

export class StoryResponseDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    image: string
    @ApiProperty()
    text: string
    @ApiProperty()
    userId: string
    @ApiProperty()
    createdAt: string
}