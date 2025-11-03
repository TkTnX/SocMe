'use client'

import { useUser } from '@/api/hooks'
import { UserBlock } from '@/entities'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const FriendsList = () => {
	const { user, isUserPending, userError } = useUser()

	if (userError) return <ErrorMessage error={userError as ErrorType} />

	if (isUserPending) return <Skeleton className='h-[800px] w-full' />

	const friends =
		user?.followings?.filter(following =>
			user.followers.some(
				follower => follower.followerId === following.followingToId
			)
		) || []

	return (
		<Block className='w-full'>
			<div>
				<p>
					Все друзья <span>{friends.length}</span>
				</p>
				<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 mt-4'>
					{friends.length > 0 ? (
						friends.map(friend => (
							<UserBlock key={friend.id} user={friend.followingTo!} />
						))
					) : (
						<p className='col-span-3 text-center'>
							Ничего не найдено!
						</p>
					)}
				</div>
			</div>
		</Block>
	)
}
