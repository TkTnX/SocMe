import { ApiProperty } from "@nestjs/swagger";

export class FollowerResponseDto {
    @ApiProperty()
    followerId: string
    @ApiProperty()
    followingToId: string
}