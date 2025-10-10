import Image from 'next/image'
import Link from 'next/link'

// TEMP
const isPremium = true

export const UserInfo = () => {
	return (
		<div className='rounded-2xl overflow-hidden'>
			<div className='relative h-20 w-full'>
				<Image
					src={'/images/temp/userCover.jpg'}
					alt='user cover'
					fill
				/>
			</div>
			<div className='flex items-start gap-2 px-3 py-1 bg-white'>
				<Image
					className='relative -mt-6 rounded-2xl'
					src={'/images/temp/userPhoto.jpg'}
					alt='user avatar'
					width={44}
					height={44}
				/>
				<div>
					<Link href={'/profile'} className='flex items-center gap-1 text-sm'>
						John Doe{' '}
						{isPremium && (
							<Image
								src={'/images/icons/premium-icon.svg'}
								width={16}
								height={13}
								alt='Премиум пользователь'
							/>
						)}
					</Link>
					<p className='text-xs text-black/40'>UI/UX Designer</p>
				</div>
			</div>
		</div>
	)
}
