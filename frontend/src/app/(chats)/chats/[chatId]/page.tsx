import { Chat } from '@/entities';
import { Block } from '@/shared/components';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Чат | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const ChatPage = async ({
	params
}: {
	params: Promise<{ chatId: string }>
}) => {
	const chatId = (await params).chatId

	return (
		<Block className='h-[calc(100vh-150px)] flex-1 px-0 pt-0'>
			<Chat chatId={chatId} />
		</Block>
	)
}

export default ChatPage