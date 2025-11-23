import { PostsList, RightMenu } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Лента | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}


const PostsPage = () => {
	return (
		<>
			<div className='flex-1'>
				<PostsList />
			</div>
			<RightMenu />
		</>
	)
}

export default PostsPage