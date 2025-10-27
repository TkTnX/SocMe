'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useUser } from '@/api/hooks'
import { UserTitle } from '@/entities'
import { Block, Button, Cover } from '@/shared/components'

export const UserInfo = () => {
	const pathname = usePathname()
	const { user, isUserPending, userError } = useUser()

	if (pathname.includes('/profile')) return null

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
			<Cover isUserPending={isUserPending} className='h-20' coverUrl={user.cover} />
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
