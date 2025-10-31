import Image from 'next/image'
import Link from 'next/link'

import { IUser } from '@/api/types'
import { Button } from '@/shared/components'

interface Props {
	user: IUser
}

export const UserBlock = ({ user }: Props) => {
	return (
		<Link
			href={`/profile/${user.id}`}
			className='flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50'
		>
			<div className='relative h-[160px] w-full'>
				<Image
					fill
					alt={'Аватар'}
					className='object-cover'
					src={user?.avatar || '/images/icons/no-avatar.svg'}
				/>
			</div>
			<div className='p-4'>
				<h4>{user.name}</h4>
				<p className='text-xs text-black'>{user.city}</p>
				<p className='text-xs text-black'>{user.hobby}</p>
				<Button className='mt-4 w-full'>Перейти</Button>
			</div>
		</Link>
	)
}
