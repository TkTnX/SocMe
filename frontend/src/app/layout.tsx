import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'
import { Header, LeftMenu } from '@/widgets'
import { Navbar } from '@/shared'

// todo: шрифт vk
const font = Nunito({
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
				<main className='container flex min-h-screen items-start gap-4 mt-10'>
					<LeftMenu />
					{children}</main>
				<Navbar isMobile={true} />
			</body>
		</html>
	)
}
