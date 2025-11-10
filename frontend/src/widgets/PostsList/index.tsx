'use client'

import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { usePosts } from '@/api/hooks'
import { IPost } from '@/api/types'
import { Post } from '@/entities'
import { ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

interface Props {
	userPosts?: IPost[]
	className?: string
}

export const PostsList = ({
	userPosts,
	className,
}: Props) => {
	const searchParams = useSearchParams()
	const hashtag = searchParams.get('hashtag') || undefined

	const { posts, error, isLoading } = usePosts(
		userPosts,
		Object.fromEntries(searchParams)
	)

	console.log(posts)
	const router = useRouter()
	const pathname = usePathname()
	if (!posts && error) <ErrorMessage error={error as ErrorType} />

	if (posts?.length === 0)
		return <p className='mt-6 flex-1 text-center'>Постов нет</p>

	return (
		<div className={className}>
			{hashtag && (
				<div className='flex items-center justify-between'>
					<h3>Поиск по тегу: #{hashtag}</h3>
					<button
						onClick={() => router.replace(pathname)}
						className='text-main'
					>
						<X />
					</button>
				</div>
			)}
			<div className='mt-4 flex flex-col gap-6'>
				{isLoading
					? [...new Array(5)].map((_, index) => (
							<Skeleton
								key={index}
								className='h-[500px] w-full'
							/>
						))
					: (userPosts ? userPosts : posts)?.map(post => (
							<Post key={post.id} post={post} />
						))}
			</div>
		</div>
	)
}
