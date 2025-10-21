import { toast } from 'react-toastify'

import { ErrorType } from '@/shared/types'

export function showErrorMessage(error: unknown) {
	const err = error as ErrorType
    toast.error(err?.response?.data.message)
    console.log(err)
    return err
}
