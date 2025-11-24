'use client'

import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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

	useEffect(() => {
		if (pageData?.posts) {
			setPostsList(prev => [...prev, ...pageData.posts])
		}
	}, [pageData?.posts.length])

	useEffect(() => {
		const bottomElement = bottomRef.current

		if (!bottomElement) return

		const observer = new IntersectionObserver(
			entries => {
				if (
					!isLoading &&
					entries[0].isIntersecting &&
					page !== pageData?.totalPages
				) {
					setPage(prev => prev + 1)
				}
			},
			{
				rootMargin: '100px'
			}
		)

		observer.observe(bottomElement)

		return () => observer.disconnect()
	}, [isLoading, page, pageData?.totalPages])

	useEffect(() => {
		if (pageData?.totalPages !== page) {
			refetch()
		}
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
			<div className='mt-4 flex flex-col gap-6'>
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
			</div>
			<div ref={bottomRef} className='h-5' />
			<div>{isLoading && <p>Fetching...</p>}</div>
			<button onClick={() => refetch()}>123</button>
		</div>
	)
}
