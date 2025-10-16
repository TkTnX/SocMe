import Image from 'next/image'
import Link from 'next/link'

import { Search } from '@/features'
import { Navbar } from '@/shared/components'

export const Header = () => {
	
	return (
		<header className='flex h-[76px] bg-white'>
			<div className='container flex items-center justify-between'>
				<Link
					className='relative block h-[30px] w-[100px] sm:h-[40px] sm:w-[130px]'
					href={'/'}
				>
					<Image src={'/images/logo.svg'} alt='Soc Me' fill />
				</Link>
				<Navbar />
				<Search />
			</div>
		</header>
	)
}
