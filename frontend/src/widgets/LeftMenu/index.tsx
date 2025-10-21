import { FollowedHashtags, SideNavbar, UserInfo } from './components'

export const LeftMenu = () => {
	return (
		<div className='hidden md:flex h-full w-full max-w-[200px] flex-col gap-6 lg:max-w-[278px] sticky'>
			<UserInfo />
			<SideNavbar />
			<FollowedHashtags />
		</div>
	)
}
