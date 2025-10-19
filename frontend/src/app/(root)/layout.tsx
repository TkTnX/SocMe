import { LeftMenu, RightMenu } from '@/widgets'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='container mt-10 flex min-h-screen items-start gap-4'>
			<LeftMenu />
			<main className='flex flex-1 items-start gap-4'>{children}</main>
		</div>
	)
}
