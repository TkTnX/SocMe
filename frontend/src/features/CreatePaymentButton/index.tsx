'use client'

import { useRouter } from 'next/navigation'

import { usePayment } from '@/api/hooks'
import { Button } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'

// todo: в будущем добавить тип
export const CreatePaymentButton = (subscription: {
	value: number
	subscriptionId: string
}) => {
	const router = useRouter()
	const { subscriptionId, value } = subscription
	const { createPaymentMutation } = usePayment()
	const { mutate, isPending } = createPaymentMutation({
		onSuccess: data => {
			const url = data.confirmation.confirmation_url
			router.push(url)
		},
		onError: err => {
			console.log(err)
			return showErrorMessage(err)
		}
	})
	return (
		<Button
			disabled={isPending}
			className='z-10 w-full'
			onClick={() => mutate({ value, subscriptionId })}
		>
			Оплатить
		</Button>
	)
}
