import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'
import { Header, LeftMenu, RightMenu } from '@/widgets'
import { Navbar } from '@/shared/components'

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
				<main className='container mt-10 flex min-h-screen items-start gap-4'>
					<LeftMenu />
					{children}
					<RightMenu />
				</main>
				<Navbar isMobile={true} />
			</body>
		</html>
	)
}
