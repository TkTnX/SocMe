'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useUser } from '@/api/hooks'
import { navbarItems } from '@/shared/data'
import { cn } from '@/shared/lib/utils'

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
				{navbarItems.map((item, index) => {
					const isActive =
						item.href === '/'
							? pathname === '/'
							: pathname.startsWith(item.href)

					return (
						<li className='relative' key={index}>
							<Link href={item.href}>
								<Image
									alt={item.href}
									src={
										isActive ? item.filledImage : item.image
									}
									className={cn('', {
										'dark:invert-100': !isActive
									})}
									width={28}
									height={28}
								/>
							</Link>

							{isActive && (
								<div className='bg-main absolute -bottom-[calc(100%-3px)] h-0.5 w-full rounded-xl' />
							)}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
