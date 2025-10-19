import Link from 'next/link'

import { IUser } from '@/api/types'
import { Button } from '@/shared/components'

// TODO: TEMP
const isSubscribed = true

interface Props {
	user: IUser | null
}

export const ProfileControls = ({ user }: Props) => {
	return (
		<div className='mt-4 flex justify-end gap-2'>
			<Button variant={isSubscribed ? 'outline' : 'default'}>
				{isSubscribed ? 'Отписаться' : 'Подписаться'}
			</Button>
			<Button asChild>
				<Link href={`/c/${user?.id}`}>Написать</Link>
			</Button>
		</div>
	)
}
