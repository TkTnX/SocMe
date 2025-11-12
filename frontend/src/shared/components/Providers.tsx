'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

interface Props {
	children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false
			}
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				{children}
			</NextThemesProvider>
			<ToastContainer />
		</QueryClientProvider>
	)
}
