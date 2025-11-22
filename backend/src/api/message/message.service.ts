import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ChatService } from 'src/api/chat/chat.service';
import { MessageDto } from 'src/api/message/dto';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { UserService } from 'src/api/user/user.service';





@Injectable()
export class MessageService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly chatService: ChatService
	) {}

	public async create( dto: MessageDto, userId: string) {
		const user = await this.userService.findUserById(userId)

		const chat = await this.chatService.getChat(dto.chatId, userId)

		if (chat.userOneId === user.id || chat.userTwoId === user.id) {
			const message = await this.prismaService.message.create({
				data: {
					text: dto.text,
					image: dto.image,
					chatId: chat.id,
					userId: user.id
				}
			})

			await this.prismaService.chat.update({
				where: { id: chat.id },
				data: { lastMessage: message.text }
			})

			return message
		} else {
			throw new UnauthorizedException('Вы не можете отправить сообщение!')
		}
	}
}