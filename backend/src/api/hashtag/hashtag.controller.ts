import {  Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { Authorized, Protected } from 'src/common/decorators';

@Controller('hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) { }
  
  @Get()
  public async getHashtags(@Query('name') name: string) {
    return await this.hashtagService.getHashtags(name)
  } 

  @Protected()
  @Post(':hashtagId')
  public async addHashtagToFavorites(@Param("hashtagId") hashtagId: string, @Authorized("userId") userId: string) {
    return await this.hashtagService.addHashtagToFavorites(hashtagId, userId)
  }
}
