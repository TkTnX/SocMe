import { AddPostForm } from '@/features'
import { PostsList, RightMenu, StoriesList } from '@/widgets'

export default function Home() {
	return (
		<>
			<div className='flex-1'>
				<StoriesList />
				<AddPostForm />
				<PostsList />
			</div>
			<RightMenu />
		</>
	)
}
