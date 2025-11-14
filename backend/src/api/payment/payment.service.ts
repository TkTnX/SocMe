import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { addMonths } from 'date-fns'
import {
	ConfirmationEnum,
	CreatePaymentRequest,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService
} from 'nestjs-yookassa'
import { PaymentDto } from 'src/api/payment/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'

@Injectable()
export class PaymentService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly configService: ConfigService,
		private readonly yookassaService: YookassaService,
		private readonly userService: UserService
	) {}

	public async create(dto: PaymentDto, userId: string) {
		const user = await this.userService.findUserById(userId)
		const paymentData: CreatePaymentRequest = {
			amount: {
				value: dto.value,
				currency: CurrencyEnum.RUB
			},
			description: 'Оплата подписки в приложении SocMe',
			payment_method_data: {
				type: PaymentMethodsEnum.BANK_CARD
			},
			capture: true,
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				return_url: `${this.configService.getOrThrow('HTTP_CORS')}/profile`
			}
		}

		const newPayment =
			await this.yookassaService.payments.create(paymentData)

		const dbPayment = await this.prismaService.payment.create({
			data: {
				subscriptionId: dto.subscriptionId,
				userId,
				yookassaPaymentId: newPayment.id
			}
		})

		// TODO: Отслеживание вебхуков
		// TODO: Валидация вебхуков
		// TODO: Работа автосписания

		// TODO: Возможно, в будущем это должно происходить после прихода webhook
		if (user.userSubscription) {
			await this.prismaService.userSubscription.update({
				where: {
					id: user.userSubscription.id
				},
				data: {
					expiresAt: addMonths(user.userSubscription.expiresAt, 1)
				}
			})
		} else {
			await this.prismaService.userSubscription.create({
				data: {
					expiresAt: addMonths(new Date(), 1),
					subscriptionId: dto.subscriptionId,
					userId,
					paymentId: dbPayment.id
				}
			})
		}
		return newPayment
	}

	public async webhook(body: { event: string; object: { id: string } }) {
		const { event, object } = body

		const dbPayment = await this.prismaService.payment.findFirst({
			where: { yookassaPaymentId: object.id }
		})

		const userSubscription =
			await this.prismaService.userSubscription.findFirst({
				where: { paymentId: dbPayment?.id }
			})

		switch (event) {
			case 'payment.succeeded':
				await this.prismaService.payment.update({
					where: {
						id: dbPayment?.id
					},
					data: {
						status: 'SUCCEEDED'
					}
				})

				await this.prismaService.userSubscription.update({
					where: {
						id: userSubscription?.id
					},
					data: {
						status: 'ACTIVE'
					}
				})
				break
			case 'payment.canceled':
				await this.prismaService.payment.update({
					where: {
						id: dbPayment?.id
					},
					data: {
						status: 'FAILED'
					}
				})

				break
			default:
				break
		}
	}
}
