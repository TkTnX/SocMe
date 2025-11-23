import { ApiProperty } from "@nestjs/swagger";

export class ChatResponseDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    lastMessage?: string
    @ApiProperty()
    userOneId: string
    @ApiProperty()
    userTwoId: string
    @ApiProperty()
    createdAt: string
}