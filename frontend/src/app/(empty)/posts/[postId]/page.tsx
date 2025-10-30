import { BigPost } from '@/widgets'

const PostPage = async ({
	params
}: {
	params: Promise<{ postId: string }>
}) => {
	const postId = (await params).postId
	return <BigPost postId={postId} />
}

export default PostPage
