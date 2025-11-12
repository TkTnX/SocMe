import Image from 'next/image'
import Link from 'next/link'

import { Block } from '@/shared/components'
import { SIDE_NAVBAR } from '@/shared/data'

export const SideNavbar = () => {
	return (
		<Block>
			<ul className='flex flex-col gap-6'>
				{SIDE_NAVBAR.map((item, index) => (
					<li key={index}>
						<Link
							className='flex items-center gap-4'
							href={item.href}
						>
							<Image
								className='dark:opacity-80 dark:invert-100'
								src={item.icon}
								alt={item.name}
								width={24}
								height={24}
							/>
							<p className='text-text'>{item.name}</p>
						</Link>
					</li>
				))}
			</ul>
		</Block>
	)
}
