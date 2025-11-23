import { FriendsList } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Ваши друзья | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const FriendsPage = () => {
	return <FriendsList />
}

export default FriendsPage