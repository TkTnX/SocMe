import { BadGatewayException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PostDto } from 'src/api/post/dto';
import { PrismaService } from 'src/api/prisma/prisma.service';





@Injectable()
export class PostService {
	public constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger(PostService.name)

	// Создание постов
	public async create(dto: PostDto, userId: string) {
		const newPost = await this.prismaService.post.create({
			data: {
				...dto,
				userId
			}
		})

		if (!newPost) {
			this.logger.error('Ошибка при создании поста!')
			throw new BadGatewayException('Не удалось создать пост!')
		}

		return newPost
	}

    // Редактирование постов
    public async edit(dto: PostDto, postId: string, userId: string) {
        const post = await this.getPostById(postId)

        if (post.userId !== userId)
			throw new UnauthorizedException('Вы не можете изменить этот пост!')
    
        const updatedPost = await this.prismaService.post.update({
			where: {
				id: post.id
			},
			data: {
                ...dto,
                updatedAt: new Date()
			}
		})

        return updatedPost
    }

	// Удаление постов
	public async delete(postId: string, userId: string) {
		const post = await this.getPostById(postId)

		if (post.userId !== userId)
			throw new UnauthorizedException('Вы не можете удалить этот пост!')

		return await this.prismaService.post.delete({ where: { id: post.id } })
	}

	// TODO: В будущем получать только посты тех, на кого подписан
	public async getPosts() {
		return await this.prismaService.post.findMany()
	}

	private async getPostById(id: string) {
		const post = await this.prismaService.post.findUnique({ where: { id } })

		if (!post) throw new NotFoundException('Пост не найден!')

		return post
	}
}