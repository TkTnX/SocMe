import { ApiProperty } from "@nestjs/swagger";

export class SubscriptionResponseDto {
    @ApiProperty()
    id: string
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    price: string
}