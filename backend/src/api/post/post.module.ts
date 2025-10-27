import { Module } from '@nestjs/common'
import { UserModule } from 'src/api/user/user.module'

import { PostController } from './post.controller'
import { PostService } from './post.service'

@Module({
	imports: [UserModule],
	controllers: [PostController],
	providers: [PostService],
	exports: [PostService]
})
export class PostModule {}
