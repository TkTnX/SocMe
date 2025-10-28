'use client'

import { useUser } from '@/api/hooks'
import { EditProfileForm, EditProfilePhotos } from '@/features'
import { Skeleton } from '@/shared/components'

export const EditProfile = () => {
	const { user, isUserPending } = useUser()

	if (isUserPending) return <Skeleton className='mt-10 h-[500px] w-full' />

	return (
		<div className='mt-10'>
			<EditProfilePhotos isUserPending={isUserPending} user={user} />
			<EditProfileForm user={user} />
		</div>
	)
}
