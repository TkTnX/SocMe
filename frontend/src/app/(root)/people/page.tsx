import { PeopleFilterMenu, PeopleList } from "@/widgets"

const PeoplePage = () => {
	return (
		<>
			<div className='flex-1'>
				<PeopleList />
			</div>
			<PeopleFilterMenu />
		</>
	)
}

export default PeoplePage
