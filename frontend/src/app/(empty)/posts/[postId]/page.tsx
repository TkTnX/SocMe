import { BigPost } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Страница поста | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const PostPage = async ({
	params
}: {
	params: Promise<{ postId: string }>
}) => {
	const postId = (await params).postId
	return <BigPost postId={postId} />
}

export default PostPage