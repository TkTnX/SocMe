import { GroupsSearch } from '@/features'
import { GroupsList, PopularGroups, UserGroups } from '@/widgets'

const GroupsPage = () => {
	return (
    <>
    <div className='flex flex-1 flex-col gap-4'>
			<GroupsSearch />
      <UserGroups />
      <GroupsList />
      </div>
    <PopularGroups />
    </>
	)
}

export default GroupsPage
