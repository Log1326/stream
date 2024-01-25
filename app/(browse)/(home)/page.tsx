import { MainView, MainViewSkeleton } from './_components/main-view'

import { Suspense } from 'react'

export default function Home() {
	return (
		<div className='h-full p-8 max-w-screen-2xl mx-auto'>
			<Suspense fallback={<MainViewSkeleton />}>
				<MainView />
			</Suspense>
		</div>
	)
}
