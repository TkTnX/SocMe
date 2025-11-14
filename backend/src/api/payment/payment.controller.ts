import { Body, Controller, Post } from '@nestjs/common'
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
	public async webhook(@Body() body: any) {
		return await this.paymentService.webhook(body)
		
	}
}
