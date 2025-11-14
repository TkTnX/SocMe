'use client'

import { TryPremiumBanner, YouMayKnow } from './components'
import { useUser } from '@/api/hooks'

export const RightMenu = () => {
	const { user } = useUser()
	return (
		<div className='hidden min-h-screen w-full max-w-[200px] flex-col gap-6 md:flex lg:max-w-[280px]'>
			{!user?.userSubscription ? <TryPremiumBanner /> : ''}
			<YouMayKnow />
		</div>
	)
}
