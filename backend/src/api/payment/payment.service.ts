import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {
	ConfirmationEnum,
	CreatePaymentRequest,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'
import { PaymentDto } from 'src/api/payment/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class PaymentService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly yookassaService: YookassaService
	) {}

	public async create(dto: PaymentDto, userId: string) {
		const paymentData: CreatePaymentRequest = {
			amount: {
				value: dto.value,
				currency: CurrencyEnum.RUB
			},
			description: 'Оплата подписки в приложении SocMe',
			payment_method_data: {
				type: PaymentMethodsEnum.BANK_CARD,
                
			},
			capture: false,
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				return_url: `${this.configService.getOrThrow('HTTP_CORS')}/profile`
			}
		}

		const newPayment =
            await this.yookassaService.payments.create(paymentData)
        
        await this.prismaService.payment.create({
            data: {
                subscriptionId: dto.subscriptionId,
                userId
            }
        })
        
        return newPayment
	}
}
