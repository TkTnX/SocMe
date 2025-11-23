import { ApiProperty } from "@nestjs/swagger";

export class FileResponseDto {
    @ApiProperty({
        type: "string",
        example: "http://localhost:5000/uploads/..."
    })
    path: string
}

export class FilesResponseDto {
    @ApiProperty({
        type: "array",
        example: "[http://localhost:5000/uploads/...]"
    })
    urls: string[]
}