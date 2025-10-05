'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { navbarItems } from '@/data'

interface Props {
	isMobile?: boolean
}

export const Navbar = ({ isMobile = false }: Props) => {
	const pathname = usePathname()

	return (
		<nav
			className={cn(
				'mx-auto hidden md:block',
				isMobile &&
					'vsm:justify-center vsm:px-0 fixed right-0 bottom-0 left-0 flex h-[50px] justify-between bg-white px-3 md:hidden'
			)}
		>
			<ul className='vsm:gap-10 vsm:justify-center flex w-full items-center justify-between lg:gap-[70px]'>
				{navbarItems.map((item, index) => (
					<li className='relative' key={index}>
						<Link href={item.href}>
							<Image
								alt={item.href}
								src={
									pathname === item.href
										? item.filledImage
										: item.image
								}
								width={28}
								height={28}
							/>
						</Link>

						{pathname === item.href && (
							<div className='bg-main absolute -bottom-[calc(100%-3px)] h-0.5 w-full rounded-xl' />
						)}
					</li>
				))}
			</ul>
		</nav>
	)
}
