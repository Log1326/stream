import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'

import Link from 'next/link'
import { SearchGetResults } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import { VerifiedMark } from '@/components/verified-mark'
import { formatDistanceToNow } from 'date-fns'

interface SearchCardProps {
	item: SearchGetResults
}
export const SearchCard: React.FC<SearchCardProps> = ({ item }) => {
	return (
		<Link href={`/${item.user.username}`}>
			<div className='w-full flex gap-x-4'>
				<div className='relative h-36 w-64'>
					<Thumbnail
						src={item.thumbnailUrl}
						isLive={item.isLive}
						username={item.user.username}
						fallback={item.user.imageUrl}
					/>
				</div>
				<div className='space-1'>
					<div className='flex items-center gap-x-2'>
						<p className='font-bold text-lg cursor-pointer hover:text-blue-500'>
							{item.user.username}
						</p>
						<VerifiedMark />
					</div>
					<p className='text-sm text-muted-foreground'>{item.name}</p>
					<p className='text-sm text-muted-foreground'>
						{formatDistanceToNow(new Date(item.updatedAt), {
							addSuffix: true
						})}
					</p>
				</div>
			</div>
		</Link>
	)
}

export const SearchCardSkeleton = () => (
	<div className='w-auto flex gap-2'>
		<div className='relative h-36 w-64'>
			<ThumbnailSkeleton />
		</div>

		<div className='space-y-4'>
			<Skeleton className='h-5 w-32' />
			<Skeleton className='h-3 w-32' />
			<Skeleton className='h-4 w-32' />
		</div>
	</div>
)
