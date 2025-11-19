import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'

@Injectable()
export class ChatService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async getChats(userId: string) {
		const user = await this.userService.findUserById(userId)

		const chats = await this.prismaService.chat.findMany({
			where: {
				OR: [
					{
						userOneId: user.id
					},
					{
						userTwoId: user.id
					}
				]
			},
			include: {
				userOne: true,
				userTwo: true
			}
		})

		return chats
	}
	public async getChat(chatId: string) {
		const chat = await this.prismaService.chat.findUnique({
			where: { id: chatId },
			include: {
				messages: {
					orderBy: {
						createdAt: 'asc'
					}
				},
				userOne: true,
				userTwo: true
			}
		})

		if (!chat) throw new NotFoundException('Чат не найден!')

		return chat
	}

	public async createChat(profileId: string, userId: string) {
		const user = await this.userService.findUserById(userId)
		const profileUser = await this.userService.findUserById(profileId)

		const isChatExist = await this.prismaService.chat.findFirst({
			where: {
				AND: [
					{
						OR: [
							{
								userOneId: user.id
							},
							{
								userOneId: profileUser.id
							}
						]
					},
					{
						OR: [
							{
								userTwoId: user.id
							},
							{
								userTwoId: profileUser.id
							}
						]
					}
				]
			}
		})

		if (isChatExist) {
			return { chatId: isChatExist.id }
		}

		const chat = await this.prismaService.chat.create({
			data: {
				userOneId: user.id,
				userTwoId: profileUser.id
			}
		})

		return chat
	}
}
