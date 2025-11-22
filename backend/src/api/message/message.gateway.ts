import { JwtService } from '@nestjs/jwt'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { MessageDto } from 'src/api/message/dto'
import { MessageService } from 'src/api/message/message.service'
import { Authorized } from 'src/common/decorators'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class MessageGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	public constructor(
		private readonly messageService: MessageService,
		private readonly jwtService: JwtService
	) {}
	@WebSocketServer()
	server: Server

	@SubscribeMessage('join-room')
	handleJoinRoom(
		@MessageBody() chatId: string,
		@ConnectedSocket() client: Socket
	) {
		client.join(chatId)
		console.log(`Client ${client.id} joined room ${chatId}`)
	}

	@SubscribeMessage('send-message')
	async handleSendMessage(
		@MessageBody() dto: MessageDto,
		@ConnectedSocket() client: Socket
	) {
		const userId = client.data.userId
		const message = await this.messageService.create(dto, userId)
		this.server.to(dto.chatId).emit('new-message', message)
		return message
	}

	handleDisconnect(client: Socket) {
		console.log(`Disconnected: ${client.id}`)
	}

	async handleConnection(client: Socket) {
		console.log(`Connected ${client.id}`)
		const token = client.handshake.auth.token

		if (!token) {
			console.log('NO TOKEN')
			client.disconnect()
			return
		}

		try {
			const payload = await this.jwtService.verifyAsync(token)
			console.log('JWT PAYLOAD:', payload)

			client.data.userId = payload.userId
			console.log('WS connected user:', client.data.userId)
		} catch (error) {
			console.log('WS AUTH ERROR:', error)
			console.log('TOKEN:', token)
			client.disconnect(true)
		}
	}
}
