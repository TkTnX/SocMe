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
import { FileModule } from './api/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static'
import { HashtagModule } from './api/hashtag/hashtag.module';
import * as path from 'path'

@Module({
	imports: [
		ConfigModule.forRoot(configServiceConfig),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, '..', 'uploads'),
			serveRoot: '/static',
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
	]
})
export class AppModule {}
