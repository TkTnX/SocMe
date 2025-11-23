import { PeopleList } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Поиск людей | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}
const PeoplePage = () => {
	return (
		<div className='flex-1'>
			<PeopleList />
		</div>
	)
}

export default PeoplePage