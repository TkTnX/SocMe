import Image from 'next/image'
import Link from 'next/link'

import { IGroup } from '@/api/types'
import { Button } from '@/shared/components'
import { SUBSCIPTION_DECLENSIONS } from '@/shared/constants'
import { getDeclensions } from '@/shared/helpers'

interface Props {
	group: IGroup
}

export const GroupBlock = ({ group }: Props) => {
	return (
		<Link
			href={`/groups/${group.id}`}
			className='flex flex-col justify-between overflow-hidden rounded-2xl bg-gray-50 dark:bg-black'
		>
			<div className='relative h-[160px] w-full'>
				<Image
					fill
					alt={'Аватар'}
					className='object-cover'
					src={group?.avatar || '/images/no-avatar-group.jpg'}
				/>
			</div>
			<div className='p-4'>
				<h4>{group.name}</h4>
				<p className='text-main text-sm font-bold'>
					{group.followers?.length}{' '}
					{getDeclensions(
						SUBSCIPTION_DECLENSIONS,
						Number(group.followers?.length)
					)}
				</p>
				<p className='text-xs text-black'>{group.type}</p>
				<Button className='mt-4 w-full'>Подписаться</Button>
			</div>
		</Link>
	)
}
