'use client'

import { FollowingSkeleton } from './following'
import { PropsWithChildren } from 'react'
import { RecommendedSkeleton } from './recommended'
import { ToggleSkeleton } from './toggle'
import { cn } from '@/lib/utils'
import { useIsClient } from 'usehooks-ts'
import { useSidebar } from '@/store/use-sidebar'

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
	const isClient = useIsClient()
	const { isCollapsed } = useSidebar(state => state)
	if (!isClient)
		return (
			<aside
				className={cn(
					`fixed left-0 w-20 lg:w-60 h-full bg-background flex 
			flex-col border-r border-[#2D2E35] z-50 transition-all duration-500`,
					{ 'w-20': isCollapsed }
				)}
			>
				<ToggleSkeleton />
				<FollowingSkeleton />
				<RecommendedSkeleton />
			</aside>
		)
	return (
		<aside
			className={cn(
				`fixed left-0 w-60 h-full bg-background flex 
			flex-col border-r border-[#2D2E35] z-50 transition-all duration-500`,
				{ 'w-20': isCollapsed }
			)}
		>
			{children}
		</aside>
	)
}
