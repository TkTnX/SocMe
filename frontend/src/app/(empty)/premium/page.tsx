import Image from 'next/image'

import { CreatePaymentButton } from '@/features'
import { Block } from '@/shared/components'
import { SubscriptionList } from '@/widgets'

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
