import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { YookassaModule } from 'nestjs-yookassa';
import * as path from 'path';
import { configServiceConfig, getYookassaConfig } from 'src/configs';



import { AuthModule } from './api/auth/auth.module';
import { CommentModule } from './api/comment/comment.module';
import { FileModule } from './api/file/file.module';
import { FollowerModule } from './api/follower/follower.module';
import { GroupModule } from './api/group/group.module';
import { HashtagModule } from './api/hashtag/hashtag.module';
import { LikeModule } from './api/like/like.module';
import { PaymentModule } from './api/payment/payment.module';
import { PostModule } from './api/post/post.module';
import { PrismaModule } from './api/prisma/prisma.module';
import { StoryModule } from './api/story/story.module';
import { UserModule } from './api/user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from 'src/api/payment/scheduler/scheduler.module';
import { SubscriptionModule } from './api/subscription/subscription.module';
import { ChatModule } from './api/chat/chat.module';





@Module({
	imports: [
		ConfigModule.forRoot(configServiceConfig),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'uploads'),
			serveRoot: '/static'
		}),
		YookassaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getYookassaConfig,
			inject: [ConfigService]
		}),
		PrismaModule,
		PostModule,
		AuthModule,
		UserModule,
		FollowerModule,
		LikeModule,
		CommentModule,
		FileModule,
		HashtagModule,
		GroupModule,
		PaymentModule,
		StoryModule,
		ScheduleModule.forRoot(),
		SchedulerModule,
		SubscriptionModule,
		ChatModule
	]
})
export class AppModule {}