'use client'

import { usePosts } from '@/api/hooks'
import { IPost } from '@/api/types'
import { Post } from '@/entities'
import { ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

interface Props {
	userPosts?: IPost[]
}

export const PostsList = ({ userPosts }: Props) => {
	const { posts, error, isLoading } = usePosts(userPosts)

	if (!posts && error) <ErrorMessage error={error as ErrorType} />

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
