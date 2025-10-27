import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configServiceConfig } from 'src/configs'

import { AuthModule } from './api/auth/auth.module'
import { CommentModule } from './api/comment/comment.module'
import { FollowerModule } from './api/follower/follower.module'
import { LikeModule } from './api/like/like.module'
import { PostModule } from './api/post/post.module'
import { PrismaModule } from './api/prisma/prisma.module'
import { UserModule } from './api/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(configServiceConfig),
		PrismaModule,
		PostModule,
		AuthModule,
		UserModule,
		FollowerModule,
		LikeModule,
		CommentModule
	]
})
export class AppModule {}
