'use client'

import { UserItem, UserItemSkeleton } from './user-item'

import { RecommendedType } from '@/lib/types'
import { useSidebar } from '@/store/use-sidebar'

interface RecommendedProps {
	data: RecommendedType[]
}
export const Recommended: React.FC<RecommendedProps> = ({ data }) => {
	const { isCollapsed } = useSidebar(state => state)
	const showLabel = !isCollapsed && data.length > 0
	return (
		<div>
			{showLabel && (
				<div className='text-center mb-4 w-full'>
					<p className='font-semibold text-muted-foreground animate-fade'>
						Recommended
					</p>
				</div>
			)}
			<ul className='space-y-4 text-center'>
				{data.map(user => (
					<UserItem
						key={user.id}
						user={user}
						isLive={user.stream?.isLive}
					/>
				))}
			</ul>
		</div>
	)
}
export const RecommendedSkeleton = () => (
	<ul className='px-2'>
		{[...Array(3)].map((_, i) => (
			<UserItemSkeleton key={i} />
		))}
	</ul>
)
