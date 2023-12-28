import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Gamehub',
	description: 'Gamehub app | Enjoy'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider
					   attribute="class"
					   defaultTheme="dark"
					   storageKey='gamehub-theme'
					>{children}</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}
