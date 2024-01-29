import { SearchCard, SearchCardSkeleton } from './search-card'

import { Skeleton } from '@/components/ui/skeleton'
import { searchService } from '@/lib/search-service'

interface SearchViewProps {
	term: string
}
export const SearchView: React.FC<SearchViewProps> = async ({ term }) => {
	const data = await searchService.getSearchResult(term)
	return (
		<div className='space-y-4 w-full'>
		<p>Results for term &quot;{term}&quot;</p>
			{data?.length === 0 ? (
				<p className='text-muted-foreground text-sm'>
					No results found. Try searching for something else
				</p>
			) : (
				<div className='flex flex-wrap gap-4'>
					{data?.map(item => (
						<SearchCard key={item.id} item={item} />
					))}
				</div>
			)}
		</div>
	)
}
export const SearchViewSkeleton = () => (
	<div className='space-y-4 w-full'>
		<Skeleton className='h-10 w-full lg:w-1/2' />
		<div className='flex flex-wrap gap-4'>
			{[...Array(3)].map((_, i) => (
				<SearchCardSkeleton key={i} />
			))}
		</div>
	</div>
)
