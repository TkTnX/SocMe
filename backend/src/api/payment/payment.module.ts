import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { UserService } from 'src/api/user/user.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, UserService],
})
export class PaymentModule {}
