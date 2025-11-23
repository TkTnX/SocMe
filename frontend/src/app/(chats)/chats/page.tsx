import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Список чатов | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const ChatsPage = () => {
	return (
		<div className='hidden min-h-[calc(100vh-180px)] flex-1 items-center justify-center text-center md:flex'>
			Выберите собеседника, чтобы начать диалог
		</div>
	)
}

export default ChatsPage
