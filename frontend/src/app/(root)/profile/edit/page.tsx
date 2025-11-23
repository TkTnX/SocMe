import { Block } from '@/shared/components';
import { EditProfile } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Редактирование профиля | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const ProfileEditPage = () => {
	return (
		<Block className='flex-1'>
            <h2 className='text-4xl font-bold text-black'>Профиль</h2>
            <EditProfile />
		</Block>
	)
}

export default ProfileEditPage