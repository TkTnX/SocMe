import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Authorized, Protected } from 'src/common/decorators';
import { NotificationDto } from 'src/api/notification/dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }
  
  @Protected()
  @Get()
  public async getNotifications(@Authorized("userId") userId: string) {
    return await this.notificationService.getNotifications(userId)
  }

  public async createNotifictation(@Body() dto: NotificationDto) {
    return await this.notificationService.createNotification(dto)
  } 

  @Protected()
  @Delete(':notificationId')
  public async deleteNotification(@Param("notificationId") notificationId: string) {
    return await this.notificationService.deleteNotification(notificationId)
  }

}
