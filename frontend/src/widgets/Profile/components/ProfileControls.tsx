import Link from 'next/link'

import { IUser } from '@/api/types'
import { FollowButton } from '@/features'
import { Button } from '@/shared/components'

interface Props {
	user: IUser | null
	profileId: string
}

export const ProfileControls = ({ user, profileId }: Props) => {
	const isUserFollowed = user?.followings.find(
		follower => follower.followerId === profileId
	)

	return (
		<>
			<div className='mt-4 flex justify-end gap-2'>
				<FollowButton
					isUserFollowed={isUserFollowed}
					profileId={profileId}
					followers={user?.followers}
					followings={user?.followings}
				/>
				<Button className='flex-1' asChild>
					<Link href={`/c/${user?.id}`}>Написать</Link>
				</Button>
			</div>

			{isUserFollowed && (
				<p className='pt-4 text-center text-xs'>
					Пользователь подписан на вас
				</p>
			)}
		</>
	)
}
