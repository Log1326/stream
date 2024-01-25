import { MainCard, MainCardSkeleton } from './main-card'

import { Skeleton } from '@/components/ui/skeleton'
import { getStreams } from '@/lib/feed-service'

export const MainView = async () => {
	const data = await getStreams()
	return (
		<div>
			<h2>Streams we think you&apos;ll like.</h2>
			{data.length === 0 && (
				<div className='text-muted-foreground text-sm'>
					No streams found.
				</div>
			)}
			<div
				className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
			 xl:grid-cols-4 2xl:grid-cols-5 gap-4`}
			>
				{data.map(stream => (
					<MainCard key={stream.id} stream={stream} />
				))}
			</div>
		</div>
	)
}

export const MainViewSkeleton = () => (
	<div>
		<Skeleton className='h-10 w-72 mb-4' />
		<div
			className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
			 xl:grid-cols-4 2xl:grid-cols-5 gap-4`}
		>
			{[...Array(4)].map((_, i) => (
				<MainCardSkeleton key={i} />
			))}
		</div>
	</div>
)
