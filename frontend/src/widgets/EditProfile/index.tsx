'use client'

import { Camera, Edit } from 'lucide-react'
import Image from 'next/image'

import { useUser } from '@/api/hooks'
import { EditProfileForm } from '@/features'
import { Button, Cover, Skeleton } from '@/shared/components'

export const EditProfile = () => {
	const { user, isUserPending } = useUser()

	if (isUserPending) return <Skeleton className='mt-10 h-[500px] w-full' />

	return (
		<div className='mt-10'>
			<div className='relative'>
				<Cover isUserPending={isUserPending} coverUrl={user?.cover} />
				<Button className='absolute top-5 right-5'>
					<Edit />
					Редактировать обложку
				</Button>
				<div className='group absolute -bottom-15 left-1/2 mt-20 h-[150px] w-[150px] -translate-x-1/2 overflow-hidden rounded-full border-2 bg-white'>
					{isUserPending ? (
						<Skeleton className='h-full w-full' />
					) : (
						<Image
							fill
							alt={'Аватар'}
							className='object-cover'
							src={user?.avatar || '/images/icons/no-avatar.svg'}
						/>
					)}
					<button className='bg-main absolute inset-0 z-10 flex items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100'>
						<Camera color='#fff' size={48} />
					</button>
				</div>
			</div>
			<EditProfileForm user={user} />
		</div>
	)
}
