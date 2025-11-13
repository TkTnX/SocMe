import { ICreatePayment, IPayment } from '@/api/types'
import { axiosInstance } from '@/shared/lib'

export const createPayment = async (
	body: ICreatePayment
): Promise<IPayment> => {
	const { data } = await axiosInstance.post('/payments', body)
	return data
}
