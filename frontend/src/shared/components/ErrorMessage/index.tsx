import { ErrorType } from '@/shared/types'

interface Props {
	error: ErrorType
	text?: string
}

export const ErrorMessage = ({ error, text }: Props) => {
	if (!error) return null

	return (
		<p className='w-full text-center text-3xl text-red-500'>
			{error.response?.data.message || text || "Что-то пошло не так"}
		</p>
	)
}
