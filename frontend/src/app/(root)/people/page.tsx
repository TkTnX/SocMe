import { PeopleList, RightMenu } from "@/widgets"

const PeoplePage = () => {
	return (
		<>
			<div className='flex-1'>
				<PeopleList />
			</div>
            {/* TODO: TEMP */}
			<RightMenu />
		</>
	)
}

export default PeoplePage
