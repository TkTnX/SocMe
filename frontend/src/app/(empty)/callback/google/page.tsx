'use client'

import { Suspense } from 'react'

import { AuthCallback } from '@/shared/components'

const GoogleCallbackPage = () => {
	return (
		<Suspense>
			<AuthCallback />
		</Suspense>
	)
}

export default GoogleCallbackPage
