import { SubscriptionList } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Оформите подписку | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const PremiumPage = () => {
	return (
		<div className='flex min-h-screen w-full flex-col items-center'>
			<div>
				<h1 className='vsm:text-6xl text-center text-3xl font-bold text-black lg:text-9xl lg:leading-36 dark:text-white'>
					Подписка <span className='text-main'>SocMe</span>
				</h1>
				<p className='vsm:text-lg text-center text-base lg:text-2xl'>
					Оформите премиум, чтобы получить больше функций
				</p>
			</div>
			<SubscriptionList />
		</div>
	)
}

export default PremiumPage