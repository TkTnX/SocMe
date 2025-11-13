import { UseMutationOptions, useMutation } from '@tanstack/react-query';



import { createPayment } from '@/api/requests';
import { ICreatePayment, IPayment } from '@/api/types';





export function usePayment() {
	const createPaymentMutation = (
		options?: Omit<
			UseMutationOptions<IPayment, any, ICreatePayment>,
			'mutationFn' | 'mutationKey'
		>
	) =>
		useMutation({
			mutationFn: (data: ICreatePayment) => createPayment(data),
			mutationKey: ['create payment'],
			...options
		})

	return {
		createPaymentMutation
	}
}