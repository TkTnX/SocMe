import { Metadata } from 'next';



import { AddPostForm } from '@/features';
import { PostsList, RightMenu, StoriesList } from '@/widgets';





export const metadata: Metadata = {
	title: 'Лента | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}


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