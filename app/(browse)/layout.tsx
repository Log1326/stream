import { PropsWithChildren, Suspense } from 'react'
import SideBar, { SidebarSkeleton } from './_components/sidebar'

import { Container } from './_components/container'
import Navbar from './_components/navbar'

export default function LayoutBrowse({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			<div className='flex h-full pt-20 overflow-hidden'>
				<Suspense fallback={<SidebarSkeleton />}>
					<SideBar />
				</Suspense>
				<Container>{children}</Container>
			</div>
		</>
	)
}
