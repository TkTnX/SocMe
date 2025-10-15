import { LeftMenu, RightMenu } from '@/widgets'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<LeftMenu />
			<main className='container mt-10 flex min-h-screen items-start gap-4'>
				{children}
			</main>
			<RightMenu />
		</>
	)
}
