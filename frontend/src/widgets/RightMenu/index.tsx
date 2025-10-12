import { TryPremiumBanner, YouMayKnow } from './components'

export const RightMenu = () => {
	return (
		<div className='hidden min-h-screen w-full max-w-[200px] md:flex lg:max-w-[280px] gap-6 flex-col'>
			<TryPremiumBanner />
			<YouMayKnow />
		</div>
	)
}
