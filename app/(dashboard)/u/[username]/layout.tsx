import { Container } from './_component/Container'
import Navbar from './_component/navbar'
import { PropsWithChildren } from 'react'
import Sidebar from './_component/sidebar'
import { authService } from '@/lib/auth-service'
import { redirect } from 'next/navigation'

export default async function LayoutUQueryUsername({
	children,
	params: { username }
}: PropsWithChildren & { params: { username: string } }) {
	const userFromDB = await authService.getAuthUserByUsername(username)
	if (!userFromDB) redirect('/')
	return (
		<>
			<Navbar />
			<div className='flex h-full pt-20'>
				<Sidebar />
				<Container>{children}</Container>
			</div>
		</>
	)
}
