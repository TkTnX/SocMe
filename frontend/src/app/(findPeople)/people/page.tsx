import { PeopleList } from '@/widgets';
import { Metadata } from 'next';
import { Suspense } from 'react';





export const metadata: Metadata = {
	title: 'Поиск людей | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}
const PeoplePage = () => {
	return (
		<div className='flex-1'>
			<Suspense>
				<PeopleList />
			</Suspense>
		</div>
	)
}

export default PeoplePage