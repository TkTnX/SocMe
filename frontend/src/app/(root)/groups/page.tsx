import { AddGroupForm, GroupsSearch } from '@/features';
import { Block, Button } from '@/shared/components';
import { GroupsList, PopularGroups, UserGroups } from '@/widgets'
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Сообщества | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}


const GroupsPage = () => {
	return (
		<>
			<div className='flex flex-1 flex-col gap-4'>
				<GroupsSearch />
				<UserGroups />
				<GroupsList />
			</div>
			<div className='hidden w-full max-w-[200px] flex-col gap-4 sm:flex lg:max-w-[280px]'>
				<Block>
					{' '}
					<AddGroupForm>
						<Button className='w-full'>Создать сообщество</Button>
					</AddGroupForm>
				</Block>
				<PopularGroups />
			</div>
		</>
	)
}

export default GroupsPage