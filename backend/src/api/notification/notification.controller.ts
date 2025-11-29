import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { NotificationDto } from 'src/api/notification/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { NotificationService } from './notification.service'

@Controller('notifications')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Protected()
	@Get()
	public async getNotifications(@Authorized('userId') userId: string) {
		return await this.notificationService.getNotifications(userId)
	}

	public async createNotifictation(@Body() dto: NotificationDto) {
		return await this.notificationService.createNotification(dto)
	}


	@Protected()
	@Patch()
	public async updateNotificationStatus(@Authorized('userId') userId:string
	) {
		return await this.notificationService.updateNotificationStatus(
			userId
		)
	}

	@Protected()
	@Delete(':notificationId')
	public async deleteNotification(
		@Param('notificationId') notificationId: string
	) {
		return await this.notificationService.deleteNotification(notificationId)
	}
}
