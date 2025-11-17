import { Module } from '@nestjs/common';
import { UserService } from 'src/api/user/user.service';



import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SchedulerModule } from './scheduler/scheduler.module';





@Module({
	controllers: [PaymentController],
	providers: [PaymentService, UserService],
	imports: [],
	exports: [PaymentService]
})
export class PaymentModule {}