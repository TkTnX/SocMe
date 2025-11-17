import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PaymentService } from 'src/api/payment/payment.service'
import { PrismaService } from 'src/api/prisma/prisma.service'

@Injectable()
export class SchedulerService {
	private readonly logger = new Logger(SchedulerService.name)
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly paymentService: PaymentService
	) {}

	@Cron(CronExpression.EVERY_12_HOURS)
	public async handleAutoBilling() {
		const users = await this.prismaService.user.findMany({
			where: {
				userSubscription: {
					expiresAt: {
						lte: new Date()
					},
					status: 'ACTIVE'
				}
			},
			include: {
				userSubscription: {
					include: {
						subscription: true
					}
				}
			}
		})

		if (!users.length) {
			this.logger.log('Нет пользователей для продления подписки')
			return
		}


		this.logger.log(`Found ${users.length} users for auto-billing`)

		for (const user of users) {
			const lastPayment = await this.prismaService.payment.findFirst({
				where: {
					userId: user.id,
					status: 'SUCCEEDED'
				},
				orderBy: {
					createdAt: 'desc'
				}
			})

			if (!lastPayment) continue

			try {
				await this.paymentService.createBySavedCard(
					user.userSubscription?.subscription!,
					user
				)
			} catch (error) {
				this.logger.error(`Что-то пошло не так ${user.email}`)
				console.log(error)
			}
		}
	}
}
