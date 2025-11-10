'use client'

import { useSearchParams } from 'next/navigation'

const GoogleCallbackPage = () => {
	const searchParams = useSearchParams()
	console.log(Object.fromEntries(searchParams))

	return <div>GoogleCallbackPage</div>
}

export default GoogleCallbackPage
