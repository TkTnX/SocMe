import { Controller, Get } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  public async getSubscriptions() {
    return await this.subscriptionService.getSubscriptions()
  }
}
