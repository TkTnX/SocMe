import Image from 'next/image'

import { ISubscription } from '@/api/types'
import { CreatePaymentButton } from '@/features'
import { Block } from '@/shared/components'

interface Props {
	subscription: ISubscription
}

export const SubscriptionItem = ({ subscription }: Props) => {
	return (
		<Block className='relative flex min-h-[500px] w-full flex-col items-center justify-between gap-5 text-center'>
			<div className='flex flex-col items-center justify-center gap-4'>
				<Image
					className='z-10'
					src={'/images/icons/premium-icon.svg'}
					alt='premium'
					width={50}
					height={50}
				/>
				<h3 className='z-10 text-2xl font-bold md:text-4xl'>
					{subscription.title}
				</h3>
				<p className='z-10 text-lg md:text-2xl'></p>
			</div>
			<p className='z-10 text-7xl font-bold text-black dark:text-white'>
				{subscription.price}₽{' '}
				<span className='text-base text-gray-500'>/ месяц</span>
			</p>
			<p className='text-sm md:text-base'>{subscription.description}</p>
			<CreatePaymentButton
				subscriptionId={subscription.id}
				value={subscription.price}
			/>
		</Block>
	)
}
