'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { saveToken } from '@/shared/lib'

export const AuthCallback = () => {
	const searchParams = useSearchParams()
	const router = useRouter()
	useEffect(() => {
		saveToken(searchParams.get('token') || '')
		router.push('/profile')
	}, [])

	return <div>Авторизация...</div>
}
