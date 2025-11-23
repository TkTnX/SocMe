import { Metadata } from 'next';



import { Profile } from '@/widgets';





export const metadata: Metadata = {
	title: 'Профиль пользователя | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const ProfilePage = async ({params}: {params: Promise<{userId: string}>}) => {
  const userId = (await params).userId
	return <Profile userId={userId} />
}

export default ProfilePage