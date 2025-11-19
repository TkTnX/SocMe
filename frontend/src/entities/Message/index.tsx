import { useUser } from '@/api/hooks'
import { IMessage } from '@/api/types'
import { cn } from '@/shared/lib'

interface Props {
	message: IMessage
}

export const Message = ({ message }: Props) => {
	const { user } = useUser()
	const isUserMessage = message.userId === user?.id
	return (
		<div
			className={cn(
				'w-fit max-w-[400px] rounded-2xl border-2 px-4 py-2',
				{ 'bg-main ml-auto text-white': isUserMessage }
			)}
		>
			<p>{message.text}</p>
			<span
				className={cn('block text-left text-[8px] text-gray-300', {
					'text-right': isUserMessage
				})}
			>
				{new Date(message.createdAt).toLocaleDateString('ru-RU')}
			</span>
		</div>
	)
}
