import { AddPostForm } from '@/features'
import { PostsList, RightMenu } from '@/widgets'

export default function Home() {
	return (
		<>
			<div className='flex-1'>
				<AddPostForm />
				<PostsList />
			</div>
			<RightMenu />
		</>
	)
}
