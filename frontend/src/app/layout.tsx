import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { Navbar } from '@/components/Header/components'

import './globals.css'
import { Header } from '@/components'

const font = Roboto({
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'SocMe | Социальная сеть',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html suppressHydrationWarning={true} lang='ru'>
			<body className={`${font.className} antialiased`}>
				<Header />
				<main>{children}</main>
				<Navbar isMobile={true} />
			</body>
		</html>
	)
}
