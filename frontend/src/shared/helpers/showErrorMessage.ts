import { toast } from 'react-toastify'

import { ErrorType } from '@/shared/types'

export function showErrorMessage(error: unknown) {
	const err = error as ErrorType
	if (typeof err?.response?.data.message !== 'string') {
		toast.error(err?.response?.data.message[0])
	} else {
		toast.error(err?.response?.data.message)
	}
	console.log(err)
	return err
}
