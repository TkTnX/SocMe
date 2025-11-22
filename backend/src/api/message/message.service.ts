import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ChatService } from 'src/api/chat/chat.service';
import { MessageDto, PartialMessageDto } from 'src/api/message/dto';
import { PrismaService } from 'src/api/prisma/prisma.service';
import { UserService } from 'src/api/user/user.service';





@Injectable()
export class MessageService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly chatService: ChatService
	) {}

	public async create(dto: MessageDto, userId: string) {
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

	public async edit(dto: PartialMessageDto, userId: string) {
		const { chatId, messageId, ...restDto } = dto
		const user = await this.userService.findUserById(userId)
		const message = await this.getMessageById(messageId)
		if (message.userId !== user.id)
			throw new UnauthorizedException('Невозможно изменить сообщение')

		const editedMessage = await this.prismaService.message.update({
			where: { id: message.id },
			data: {
				...restDto,
				updatedAt: new Date()
			}
		})

		return editedMessage
	}

	public async delete(messageId: string, userId: string) {
		const user = await this.userService.findUserById(userId)

		const message = await this.getMessageById(messageId)

		if (message.userId !== user.id)
			throw new UnauthorizedException('Невозможно удалить сообщение')

		return await this.prismaService.message.delete({
			where: { id: message.id }
		})
	}

	private async getMessageById(messageId: string) {
		const message = await this.prismaService.message.findUnique({
			where: { id: messageId }
		})
		if (!message) throw new NotFoundException('Сообщение не найдено')
		return message
	}
}