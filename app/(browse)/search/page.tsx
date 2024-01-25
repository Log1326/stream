import { SearchView, SearchViewSkeleton } from './_components/search-view'

import { Suspense } from 'react'
import { redirect } from 'next/navigation'

type Params = { searchParams: { term?: string } }
export default function SearchPage({ searchParams: { term } }: Params) {
	if (!term) redirect('/')
	return (
		<div className='h-full p-8 max-w-screen-xl mx-auto'>
			<Suspense fallback={<SearchViewSkeleton />}>
				<SearchView term={term} />
			</Suspense>
		</div>
	)
}
