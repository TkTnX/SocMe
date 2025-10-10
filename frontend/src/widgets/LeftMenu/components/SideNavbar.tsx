import Image from 'next/image'
import Link from 'next/link'

import { SIDE_NAVBAR } from '@/shared'

export const SideNavbar = () => {
	return (
		<nav className='bg-white px-5 py-6 rounded-2xl'>
			<ul className='flex flex-col gap-6'>
				{SIDE_NAVBAR.map((item, index) => (
					<li key={index}>
						<Link
							className='flex items-center gap-4'
							href={item.href}
						>
							<Image
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
		</nav>
	)
}
