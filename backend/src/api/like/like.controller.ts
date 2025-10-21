import { Controller, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { Authorized, Protected } from 'src/common/decorators';
import { ELikeType } from 'generated/prisma';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }
  
  @Protected()
  @Post("/:type/:id")
  public async like(@Param("type") type: ELikeType, @Param("id") id: string, @Authorized("userId") userId: string) {
    return await this.likeService.like(type, id, userId)
  }
}
