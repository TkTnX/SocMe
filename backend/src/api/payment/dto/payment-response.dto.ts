import { ApiProperty } from '@nestjs/swagger'

export class PaymentResponseDto {
	@ApiProperty()
	id: string
	@ApiProperty()
	subscriptionId: string
	@ApiProperty()
	yookassaPaymentId: string
	@ApiProperty()
	status: string
	@ApiProperty()
	userId: string
	@ApiProperty()
	createdAt: string
}
