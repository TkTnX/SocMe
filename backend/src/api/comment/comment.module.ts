import { Module } from '@nestjs/common';
import { PostService } from 'src/api/post/post.service';



import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PostModule } from 'src/api/post/post.module';





@Module({
	imports: [PostModule],
	controllers: [CommentController],
	providers: [CommentService]
})
export class CommentModule {}