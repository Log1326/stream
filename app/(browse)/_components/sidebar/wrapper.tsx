'use client'

import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
	const { isCollapsed } = useSidebar(state => state)
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
