import { LogoutButton } from '@/features'
import { Block, ThemeButton } from '@/shared/components'

const SettingsPage = () => {
	return (
		<Block className='flex-1'>
			<h2 className='text-4xl font-bold text-inherit'>Настройки</h2>
			<div className='mt-4 flex flex-col gap-4'>
				<ThemeButton />
				<LogoutButton />
			</div>
		</Block>
	)
}

export default SettingsPage
