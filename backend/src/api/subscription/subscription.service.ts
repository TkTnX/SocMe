import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma/prisma.service';





@Injectable()
export class SubscriptionService {
	public constructor(private readonly prismaService: PrismaService) {}

    public async getSubscriptions() {
        const subscriptions = await this.prismaService.subscription.findMany()
        if (!subscriptions) throw new NotFoundException("Подписки не найдены!")
        
        return subscriptions
    }
}