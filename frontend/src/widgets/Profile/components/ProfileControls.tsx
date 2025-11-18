

import { IUser } from '@/api/types'
import { CreateChatButton, FollowButton } from '@/features'


interface Props {
	profile: IUser | null
}

export const ProfileControls = ({ profile }: Props) => {
	return (
		<>
			<div className='mt-4 flex justify-end gap-2'>
				<FollowButton
					type='USER'
					followId={profile?.id || ''}
					profile={profile}
				/>
				<CreateChatButton profileId={profile?.id} />
			</div>
		</>
	)
}
