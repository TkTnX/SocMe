import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma/prisma.service';

@Injectable()
export class PostService {
    public constructor(private readonly prismaService: PrismaService) { }
    
    // TODO: В будущем получать только посты тех, на кого подписан
    public async getPosts() {
        return await this.prismaService.post.findMany()
    }

    private async getPostById(id: string) {
        const post = await this.prismaService.post.findUnique({ where: { id } })
        
        if (!post) throw new NotFoundException("Пост не найден!")
        
        return post
    }
}
