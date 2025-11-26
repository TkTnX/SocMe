'use client'

import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { usePosts } from '@/api/hooks'
import { IPost } from '@/api/types'
import { Post } from '@/entities'
import { ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

interface Props {
	userPosts?: IPost[]
	className?: string
}

export const PostsList = ({ userPosts, className }: Props) => {
	const [postsList, setPostsList] = useState<IPost[]>([])
	const [page, setPage] = useState(0)
	const searchParams = useSearchParams()
	const bottomRef = useRef<null | HTMLDivElement>(null)
	const hashtag = searchParams.get('hashtag') || undefined

	const { pageData, error, isLoading, refetch } = usePosts(userPosts, {
		...Object.fromEntries(searchParams),
		page: String(page)
	})

	const router = useRouter()
	const pathname = usePathname()
	if (!pageData && error) <ErrorMessage error={error as ErrorType} />
	if (pageData?.posts?.length === 0)
		return <p className='mt-6 flex-1 text-center'>Постов нет</p>
	const hasMore = pageData?.totalPages !== page + 1

	useEffect(() => {
		if (!pageData) return
		if (page === 0) {
			setPostsList(pageData.posts)
		} else {
			setPostsList([...postsList, ...pageData.posts])
		}
	}, [pageData])

	useEffect(() => {
		refetch()
	}, [page])

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
			<InfiniteScroll
				className='mt-4 flex flex-col gap-6'
				dataLength={pageData?.posts.length || 0}
				next={() => setPage(prev => prev + 1)}
				hasMore={hasMore}
				loader={<p>Загрузка...</p>}
				endMessage={<p>Вы дошли до конца!</p>}
			>
				{isLoading
					? [...new Array(5)].map((_, index) => (
							<Skeleton
								key={index}
								className='h-[500px] w-full'
							/>
						))
					: (userPosts ? userPosts : postsList)?.map(post => (
							<Post key={post.id} post={post} />
						))}
			</InfiniteScroll>
			<div ref={bottomRef} className='h-5' />
		</div>
	)
}
