import { BigGroup } from '@/entities';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Сообщество | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}


const GroupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id
	return <BigGroup id={id} />
}

export default GroupPage