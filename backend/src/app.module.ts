import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { configServiceConfig } from 'src/configs'

import { AuthModule } from './api/auth/auth.module'
import { CommentModule } from './api/comment/comment.module'
import { FileModule } from './api/file/file.module'
import { FollowerModule } from './api/follower/follower.module'
import { GroupModule } from './api/group/group.module'
import { HashtagModule } from './api/hashtag/hashtag.module'
import { LikeModule } from './api/like/like.module'
import { PostModule } from './api/post/post.module'
import { PrismaModule } from './api/prisma/prisma.module'
import { UserModule } from './api/user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(configServiceConfig),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'uploads'),
			serveRoot: '/static'
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
		GroupModule
	]
})
export class AppModule {}
