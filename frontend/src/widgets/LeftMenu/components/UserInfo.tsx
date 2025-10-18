'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useUser } from '@/api/hooks'
import { UserTitle } from '@/entities'
import { Block, Button } from '@/shared/components'

export const UserInfo = () => {
	const { user, isUserPending, userError } = useUser()
	if (!user || userError)
		return (
			<Block>
				<Button className='w-full' asChild>
					<Link href={'/auth/sign-in'}>Войти в аккаунт</Link>
				</Button>
			</Block>
		)
	return (
		<div className='overflow-hidden rounded-2xl bg-white'>
			<div className='relative h-20 w-full'>
				<Image
					src={'/images/temp/userCover.jpg'}
					alt='user cover'
					fill
				/>
			</div>
			<Block className='overflow-visible rounded-t-none px-3 py-1'>
				<UserTitle
					isUserPending={isUserPending}
					user={user}
					userImageClassName='-mt-6'
				/>
			</Block>
		</div>
	)
}
