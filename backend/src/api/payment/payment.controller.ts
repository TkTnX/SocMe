import { Body, Controller, Headers, Post } from '@nestjs/common'
import { PaymentDto } from 'src/api/payment/dto'
import { Authorized, Protected } from 'src/common/decorators'

import { PaymentService } from './payment.service'

@Controller('payments')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Protected()
	@Post()
	public async create(
		@Body() dto: PaymentDto,
		@Authorized('userId') userId: string
	) {
		return await this.paymentService.create(dto, userId)
	}

	@Post('webhook')
	public async webhook(
		@Body() body: any,
		@Headers('x-real-ip') realIp: string,
		@Headers('x-forwarded-for') forwardedFor: string
	) {

		const ip = realIp ?? (forwardedFor ? forwardedFor.split(',')[0] : null)

		return await this.paymentService.webhook(body, ip)
	}
}
