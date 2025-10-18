'use client'

import { useRouter } from 'next/navigation'

import { useUser } from '@/api/hooks'

 const FakeProfilePage = () => {
	const router = useRouter()
	const { user } = useUser()

    return <div></div>
 }

export default FakeProfilePage