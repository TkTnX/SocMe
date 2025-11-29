'use client'

import { AuthCallback } from '@/shared/components'
import { Suspense } from 'react'


const YandexCallbackPage = () => {
	return (
		<Suspense>
			<AuthCallback />
		</Suspense>
	)
}

export default YandexCallbackPage
