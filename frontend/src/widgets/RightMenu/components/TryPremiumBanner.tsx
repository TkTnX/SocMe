import Image from 'next/image'
import Link from 'next/link'

export const TryPremiumBanner = () => {
	return (
		<Link
			href={'/premium'}
			className='relative block h-[120px] w-full overflow-hidden rounded-2xl bg-[linear-gradient(225deg,#fff_0%,rgba(212,241,255,0.54)_100%)] px-4 pt-4 pb-[80px] lg:h-[168px]'
		>
			<Image alt='Premium image' fill src={'/images/premium.png'} />
		</Link>
	)
}
