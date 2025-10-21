import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'
import { Navbar, Providers } from '@/shared/components'
import { Header } from '@/widgets'

const vkFont = localFont({
	src: [
		{
			path: '../shared/fonts/vk/VK_Sans_Display_Regular.ttf',
			weight: '400'
		},
		{
			path: '../shared/fonts/vk/VKSansDisplay-Medium.ttf',
			weight: '500'
		}
	]
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
			<body className={`${vkFont.className} pb-20 antialiased md:pb-0`}>
				<Providers>
					<Header />
					{children}
					<Navbar isMobile={true} />
				</Providers>
			</body>
		</html>
	)
}
