import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { SubscriptionResponseDto } from 'src/api/subscription/dto'

import { SubscriptionService } from './subscription.service'

@Controller('subscriptions')
@ApiTags('Subscriptions')
export class SubscriptionController {
	constructor(private readonly subscriptionService: SubscriptionService) {}

	@Get()
	@ApiOkResponse({ type: SubscriptionResponseDto })
	public async getSubscriptions() {
		return await this.subscriptionService.getSubscriptions()
	}
}
