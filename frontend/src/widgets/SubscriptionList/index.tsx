'use client'

import Image from 'next/image'

import { useSubscription } from '@/api/hooks'
import { CreatePaymentButton } from '@/features'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'
import { SubscriptionItem } from '@/entities'

export const SubscriptionList = () => {
	const { getSubscriptionsQuery } = useSubscription()

	const { data, isPending, error } = getSubscriptionsQuery()

	if (error) return <ErrorMessage error={error as ErrorType} />

	return (
		<div className='mt-10 flex w-full items-center justify-center gap-4'>
			{isPending ? (
				[...new Array(3)].map((_, index) => (
					<Skeleton key={index} className='h-[500px] w-full' />
				))
			) : (
			data.map((subscription) => <SubscriptionItem subscription={subscription} key={subscription.id} />)
			)}
		</div>
	)
}
