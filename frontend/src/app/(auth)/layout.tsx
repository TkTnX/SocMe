export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='container mt-10 flex items-start gap-4'>
			{children}
		</main>
	)
}
