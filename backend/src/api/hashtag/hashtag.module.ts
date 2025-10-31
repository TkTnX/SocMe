import { Module } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { HashtagController } from './hashtag.controller';
import { UserService } from 'src/api/user/user.service';

@Module({
  controllers: [HashtagController],
  providers: [HashtagService, UserService],
})
export class HashtagModule {}
