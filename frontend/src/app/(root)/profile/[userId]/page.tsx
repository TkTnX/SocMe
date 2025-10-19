import { Profile } from '@/widgets'

const ProfilePage = async ({params}: {params: Promise<{userId: string}>}) => {
  const userId = (await params).userId
	return <Profile userId={userId} />
}

export default ProfilePage

