import Image from 'next/image'
import Link from 'next/link'

import { UserTitle } from '@/entities'
import { Block } from '@/shared/components'

export const UserInfo = () => {
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
				<UserTitle userImageClassName='-mt-6' />
			</Block>
		</div>
	)
}
