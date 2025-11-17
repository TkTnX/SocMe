import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { PaymentModule } from 'src/api/payment/payment.module'

import { SchedulerService } from './scheduler.service'

@Module({
	imports: [ScheduleModule.forRoot(), PaymentModule],
	providers: [SchedulerService]
})
export class SchedulerModule {}
