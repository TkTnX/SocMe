import { Metadata } from 'next'
import { Suspense } from 'react'

import { PostsList, RightMenu } from '@/widgets'

export const metadata: Metadata = {
	title: 'Лента | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const PostsPage = () => {
	return (
		<>
			<div className='flex-1'>
				<Suspense>
					<PostsList />
				</Suspense>
			</div>
			<RightMenu />
		</>
	)
}

export default PostsPage
