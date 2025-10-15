import { AddPostForm } from '@/features'
import { PostsList } from '@/widgets'

export default function Home() {
	return (
		<div className='flex-1'>
			<AddPostForm />
			<PostsList />
		</div>
	)
}
