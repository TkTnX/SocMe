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

	return (
		<div className='mt-6 flex flex-col gap-6'>
			{isLoading
				? [...new Array(5)].map((_, index) => <Skeleton key={index} className='w-full h-[500px]' />)
				: posts?.map(post => <Post key={post.id} post={post} />)}
		</div>
	)
}
