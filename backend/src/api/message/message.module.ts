import { Module } from '@nestjs/common'
import { AuthModule } from 'src/api/auth/auth.module'
import { ChatService } from 'src/api/chat/chat.service'
import { MessageController } from 'src/api/message/message.controller'
import { NotificationService } from 'src/api/notification/notification.service'
import { UserService } from 'src/api/user/user.service'

import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
	imports: [AuthModule],
	controllers: [MessageController],
	providers: [
		MessageGateway,
		MessageService,
		UserService,
		ChatService,
		NotificationService
	]
})
export class WebsocketMessageModule {}
