import Link from 'next/link'

import { UserTitle } from '@/entities'
import { Block } from '@/shared/components'

export const YouMayKnow = () => {
	return (
		<Block className='px-3'>
			<h6 className='text-black'>Возможно, вам знакомы:</h6>
			<div className='mt-6 flex flex-col gap-6 border-b pb-6'>
				<div className='flex flex-col justify-between gap-2 lg:flex-row lg:items-center'>
					<UserTitle user={{name: "John doe"}} />
					<button className='text-main border-main rounded-xl border p-2 text-sm'>
						Подписаться
					</button>
				</div>
				<div className='flex flex-col justify-between gap-2 lg:flex-row lg:items-center'>
					<UserTitle user={{name: "Jane Grill"}} />
					<button className='text-main border-main rounded-xl border p-2 text-sm'>
						Подписаться
					</button>
				</div>
				<div className='flex flex-col justify-between gap-2 lg:flex-row lg:items-center'>
					<UserTitle user={{name: "Tom Soul"}} />
					<button className='text-main border-main rounded-xl border p-2 text-sm'>
						Подписаться
					</button>
				</div>
			
			</div>
			<Link
				href={'/people'}
				className='text-main block pt-4 text-center text-sm hover:opacity-80'
			>
				Больше
			</Link>
		</Block>
	)
}
