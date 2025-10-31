'use client'

import Link from 'next/link'

import { useUser } from '@/api/hooks'
import { Block, Skeleton } from '@/shared/components'
import { AddHashtag } from '@/widgets/AddHashtag'

export const FollowedHashtags = () => {
	const { user, isUserPending, userError } = useUser()
	if (userError) return null
	return (
		<Block>
			<div className='flex items-center justify-between border-b pb-1'>
				<h4 className='uppercase'>Любимые хэштеги</h4>
				<AddHashtag user={user} />
			</div>

			<div className='mt-3.5 flex flex-wrap gap-2.5'>
				{isUserPending
					? [...new Array(9)].map((_, index) => (
							<Skeleton key={index} className='h-8 w-20' />
						))
					: user && user.hashtags.length > 0
						? user?.hashtags.map(hashtag => (
								<Link
									key={hashtag.id}
									href={`/posts?hashtag=${hashtag.name.substring(1)}`}
									className='text-main border-main hover:bg-main w-fit rounded-full border px-2 py-1 text-center transition hover:text-white'
								>
									{hashtag.name}
								</Link>
							))
						: 'Ничего нет'}
			</div>
		</Block>
	)
}
