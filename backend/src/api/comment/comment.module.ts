import { Module } from '@nestjs/common'
import { NotificationService } from 'src/api/notification/notification.service'
import { PostModule } from 'src/api/post/post.module'
import { PostService } from 'src/api/post/post.service'
import { UserModule } from 'src/api/user/user.module'
import { UserService } from 'src/api/user/user.service'

import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'

@Module({
	imports: [PostModule, UserModule],
	controllers: [CommentController],
	providers: [CommentService, NotificationService, UserService]
})
export class CommentModule {}
