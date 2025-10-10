import { FollowedHashtags, SideNavbar, UserInfo } from './components'

export const LeftMenu = () => {
	return (
		<div className='flex h-full w-full max-w-[278px] flex-col gap-6'>
			<UserInfo />
      <SideNavbar />
      <FollowedHashtags />
		</div>
	)
}
