import Link from 'next/link'

import { IUser } from '@/api/types'
import { FollowButton } from '@/features'
import { Button } from '@/shared/components'

interface Props {
	user: IUser | null
	profileId: string
}

export const ProfileControls = ({ user, profileId }: Props) => {
	
	return (
		<>
			<div className='mt-4 flex justify-end gap-2'>
				<FollowButton
					followings={user?.followings}
					profileId={profileId}
					followers={user?.followers}
				/>
				<Button className='flex-1' asChild>
					<Link href={`/c/${user?.id}`}>Написать</Link>
				</Button>
			</div>

		
		</>
	)
}
