'use client'

import { UserItem, UserItemSkeleton } from './user-item'

import { followService } from '@/lib/follow-service'
import { useSidebar } from '@/store/use-sidebar'

interface FollowingProps {
	data: Awaited<ReturnType<typeof followService.getFollowedUser>>
}
export const Following: React.FC<FollowingProps> = ({ data }) => {
	const { isCollapsed } = useSidebar(state => state)
	if (!data.length) return null

	return (
		<div>
			{!isCollapsed && (
				<div className='text-center my-4'>
					<p className='text-sm text-muted-foreground'>Following</p>
				</div>
			)}
			<ul>
				{data.map(follow => (
					<UserItem
						key={follow.following.id}
						user={follow.following}
						isLive={follow.following.stream?.isLive}
					/>
				))}
			</ul>
		</div>
	)
}
export const FollowingSkeleton = () => (
	<ul className='px-2 pt-2 lg:pt-0'>
		{[...Array(3)].map((_, i) => (
			<UserItemSkeleton key={i} />
		))}
	</ul>
)
