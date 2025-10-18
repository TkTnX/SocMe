import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'
import { Navbar, Providers } from '@/shared/components'
import { Header } from '@/widgets'

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
			<body className={`${font.className} pb-20 antialiased md:pb-0`}>
				<Providers>
					<Header />
					{children}
					<Navbar isMobile={true} />
				</Providers>
			</body>
		</html>
	)
}
