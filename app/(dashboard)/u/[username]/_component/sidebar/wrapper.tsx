'use client'

import { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
	const { isCollapsed } = useCreatorSidebar(state => state)

	return (
		<aside
			className={cn(
				`fixed left-0 flex flex-col w-20 lg:w-60 h-full 
                bg-background border-r border-[#2D2E35] z-50 
                transition-all ease-in-out duration-500`,
				{
					'lg:w-20': isCollapsed
				}
			)}
		>
			{children}
		</aside>
	)
}
