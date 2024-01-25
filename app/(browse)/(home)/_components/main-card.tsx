import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'

import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { StreamsTypes } from '@/lib/types'
import { UserAvatar } from '@/components/user-avatar'

interface MainCardProps {
	stream: StreamsTypes
}
export const MainCard: React.FC<MainCardProps> = ({ stream }) => {
	return (
		<Link href={`/${stream.user.username}`}>
			<div className='mb-4'>
				<Thumbnail
					src={stream.thumbnailUrl}
					fallback={stream.user.imageUrl}
					isLive={stream.isLive}
					username={stream.user.username}
				/>
			</div>

			<div className='flex gap-x-3'>
				<UserAvatar
					username={stream.user.username}
					isLive={stream.isLive}
					imageUrl={stream.user.imageUrl}
				/>
				<div className='flex flex-col text-sm overflow-hidden'>
					<p className='truncate font-semibold hover:text-blue-500'>
						{stream.name}
					</p>
					<p className='text-muted-foreground'>
						{stream.user.username}
					</p>
				</div>
			</div>
		</Link>
	)
}

export const MainCardSkeleton = () => (
	<div className='mb-4'>
		<ThumbnailSkeleton />
		<div className='flex gap-x-3'>
			<Skeleton className='rounded-full lg:h-10 lg:w-10 w-20 h-20' />
			<div className='flex flex-col gap-y-1'>
				<Skeleton className='h-7 w-44 lg:h-4 lg:w-32' />
				<Skeleton className='h-6 w-36 lg:h-3 lg:w-24' />
			</div>
		</div>
	</div>
)
