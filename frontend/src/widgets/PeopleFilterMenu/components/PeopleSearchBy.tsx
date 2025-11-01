import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

import { Block } from '@/shared/components'
import { cn } from '@/shared/lib'

export const PeopleSearchBy = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const act = searchParams.get('act')
	return (
		<Block className='flex flex-col gap-2'>
			<Link
				className={cn('rounded-2xl px-4 py-2 hover:bg-gray-200/20', {
					'bg-gray-200/20': pathname === '/friends'
				})}
				href={'/friends'}
			>
				Мои друзья
			</Link>
			<Link
				className={cn('rounded-2xl px-4 py-2 hover:bg-gray-200/20', {
					'bg-gray-200/20': act
				})}
				href={'/people?act=followers'}
			>
				Заявки в друзья
			</Link>
			<Link
				className={cn('rounded-2xl px-4 py-2 hover:bg-gray-200/20', {
					'bg-gray-200/20': pathname === '/people' && !act
				})}
				href={'/people'}
			>
				Поиск друзей
			</Link>
		</Block>
	)
}
