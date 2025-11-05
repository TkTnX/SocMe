import { GroupsSearch } from '@/features'
import { Block, Button } from '@/shared/components'
import { GroupsList, PopularGroups, UserGroups } from '@/widgets'

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
					<Button className='w-full'>Создать сообщество</Button>
				</Block>
				<PopularGroups />
			</div>
		</>
	)
}

export default GroupsPage
