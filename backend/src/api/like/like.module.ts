import { Module } from '@nestjs/common'
import { NotificationService } from 'src/api/notification/notification.service'
import { UserModule } from 'src/api/user/user.module'

import { LikeController } from './like.controller'
import { LikeService } from './like.service'

@Module({
	imports: [UserModule],
	controllers: [LikeController],
	providers: [LikeService, NotificationService, UserModule]
})
export class LikeModule {}
