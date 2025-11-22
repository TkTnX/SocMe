import { PartialType } from "@nestjs/mapped-types";





export class MessageDto {
	text: string

	image?: string
	chatId: string

}

export class PartialMessageDto extends PartialType(MessageDto) {
	messageId: string
}