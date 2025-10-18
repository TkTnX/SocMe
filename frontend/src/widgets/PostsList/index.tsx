'use client'

import { usePosts } from '@/api/hooks'
import { Post } from '@/entities'
import { Skeleton } from '@/shared/components'

export const PostsList = () => {
	const { posts, error, isLoading } = usePosts()

	// TODO: Вывод компонента ошибки
	if (!posts && error)
		return (
			<p className='text-center text-3xl text-red-500'>
				Ошибка при получении постов
			</p>
		)

	if (posts?.length === 0)
		return <p className='mt-6 text-center'>Постов нет</p>

	return (
		<div className='mt-6 flex flex-col gap-6'>
			{isLoading
				? [...new Array(5)].map((_, index) => (
						<Skeleton key={index} className='h-[500px] w-full' />
					))
				: posts?.map(post => <Post key={post.id} post={post} />)}
		</div>
	)
}
