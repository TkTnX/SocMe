import { Injectable, NotFoundException } from '@nestjs/common'
import { NotificationDto } from 'src/api/notification/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'

@Injectable()
export class NotificationService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async getNotifications(userId: string) {
		const notifications = await this.prismaService.notification.findMany({
			where: { userId }
		})

		if (!notifications) return { message: 'Уведомелний нет!' }

		return notifications
	}

	public async createNotification(dto: NotificationDto) {
		const user = await this.userService.findUserById(dto.userId)

		const newNotification = await this.prismaService.notification.create({
			data: {
				...dto,
				userId: user.id
			}
		})

		return newNotification
	}

	public async updateNotificationStatus(notificationId: string) {
		const notification = await this.getNotificationById(notificationId)

		return await this.prismaService.notification.update({
			where: { id: notification.id },
			data: { isRead: true }
		})
	}

	public async deleteNotification(notificationId: string) {
		const notification = await this.getNotificationById(notificationId)

		return await this.prismaService.notification.delete({
			where: { id: notification.id }
		})
	}

	private async getNotificationById(notificationId: string) {
		const notification = await this.prismaService.notification.findUnique({
			where: { id: notificationId }
		})

		if (!notification)
			throw new NotFoundException('Уведомеление не найдено')

		return notification
	}
}
