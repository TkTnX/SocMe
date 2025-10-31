import { PostsList, RightMenu } from '@/widgets'

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
