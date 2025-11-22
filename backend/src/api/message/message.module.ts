import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from 'src/api/auth/auth.module'
import { ChatService } from 'src/api/chat/chat.service'
import { MessageController } from 'src/api/message/message.controller'
import { UserService } from 'src/api/user/user.service'
import { getJwtConfig } from 'src/configs'

import { MessageGateway } from './message.gateway'
import { MessageService } from './message.service'

@Module({
	imports: [AuthModule],
	controllers: [MessageController],
	providers: [MessageGateway, MessageService, UserService, ChatService]
})
export class WebsocketMessageModule {}
