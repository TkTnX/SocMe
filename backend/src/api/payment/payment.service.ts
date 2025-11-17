import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { addMonths } from 'date-fns'
import { Subscription, User } from 'generated/prisma'
import {
	ConfirmationEnum,
	CreatePaymentRequest,
	CurrencyEnum,
	PaymentMethodsEnum,
	VatCodesEnum,
	YookassaService
} from 'nestjs-yookassa'
import { PaymentDto } from 'src/api/payment/dto'
import { PrismaService } from 'src/api/prisma/prisma.service'
import { UserService } from 'src/api/user/user.service'
import { YOOKASSA_IP } from 'src/constants'

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
			save_payment_method: true,

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
				// @ts-ignore
				paymentMethodId: newPayment.payment_method?.id,
				yookassaPaymentId: newPayment.id
			}
		})

		console.log(user)
		const userSubscription =
			await this.prismaService.userSubscription.findFirst({
				where: { userId }
			})
		if (userSubscription) {
			await this.prismaService.userSubscription.update({
				where: {
					id: userSubscription?.id
				},
				data: {
					status: 'ACTIVE',
					expiresAt: addMonths(userSubscription.expiresAt, 1)
				}
			})
		} else {
			await this.prismaService.userSubscription.create({
				data: {
					status: 'DISABLED',
					expiresAt: addMonths(new Date(), 1),
					subscriptionId: dto.subscriptionId,
					userId,
					paymentId: dbPayment.id
				}
			})
		}
		return newPayment
	}

	public async createBySavedCard(subscription: Subscription, user: User) {
		const lastPayment = await this.prismaService.payment.findFirst({
			where: { userId: user.id, status: 'SUCCEEDED' },
			orderBy: { createdAt: 'desc' }
		})

		if (!lastPayment?.paymentMethodId) {
			throw new Error('У пользователя нет сохранённого payment_method_id')
		}

		const yookassaPayment = await this.yookassaService.payments.create({
			amount: {
				value: subscription.price,
				currency: CurrencyEnum.RUB
			},
			description: `Рекурентное списание подписки "${subscription.title}"`,
			// @ts-ignore
			payment_method_id: lastPayment.paymentMethodId,
			receipt: {
				customer: {
					email: user.email
				},
				items: [
					{
						description: `Рекурентное списание подписки "${subscription.title}"`,
						quantity: 1,
						amount: {
							value: subscription.price,
							currency: CurrencyEnum.RUB
						},
						vat_code: VatCodesEnum.NDS_NONE
					}
				]
			},
			capture: true,
			save_payment_method: true
		})

		const newDbPayment = await this.prismaService.payment.create({
			data: {
				yookassaPaymentId: yookassaPayment.id,
				subscriptionId: subscription.id,
				paymentMethodId: lastPayment.paymentMethodId,
				userId: user.id
			}
		})

		await this.prismaService.userSubscription.update({
			where: { userId: user.id },
			data: {
				status: 'ACTIVE',
				// @ts-ignore
				expiresAt: addMonths(user.userSubscription.expiresAt, 1),
				paymentId: newDbPayment.id
			}
		})

		return yookassaPayment
	}

	public async webhook(
		body: { event: string; object: { id: string } },
		ip: string
	) {
		const { event, object } = body
		if (!YOOKASSA_IP.includes(ip))
			throw new BadGatewayException('Webhook не прошёл проверку!')
		const dbPayment = await this.prismaService.payment.findFirst({
			where: { yookassaPaymentId: object.id }
		})

		if (!dbPayment) {
			throw new BadGatewayException(
				`Платёж с yookassaPaymentId ${object.id} не найден в базе`
			)
		}

		const userSubscription =
			await this.prismaService.userSubscription.findFirst({
				where: { userId: dbPayment?.userId }
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
