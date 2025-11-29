import { Metadata } from 'next'
import { Suspense } from 'react'

import { FriendsList } from '@/widgets'

export const metadata: Metadata = {
	title: 'Ваши друзья | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const FriendsPage = () => {
	return (
		<Suspense>
			<FriendsList />
		</Suspense>
	)
}

export default FriendsPage
