import Link from 'next/link'

import { IUser } from '@/api/types'
import { FollowButton } from '@/features'
import { Button } from '@/shared/components'

interface Props {
	profile: IUser | null
}

export const ProfileControls = ({ profile }: Props) => {
	
	return (
		<>
			<div className='mt-4 flex justify-end gap-2'>
				<FollowButton
					type='USER'
					followId={profile?.id || ""}
					profile={profile}
				/>
				<Button className='flex-1' asChild>
					<Link href={`/c/${profile?.id}`}>Написать</Link>
				</Button>
			</div>

		
		</>
	)
}
