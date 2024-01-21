'use client'

import { PropsWithChildren, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'
import { useMediaQuery } from 'usehooks-ts'

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
	const { onCollapsed, onExpand, isCollapsed } = useCreatorSidebar(
		state => state
	)
	const matcher = useMediaQuery(`(max-width:1024px)`)
	useEffect(() => {
		if (matcher) onCollapsed()
		else onExpand()
	}, [matcher, onCollapsed, onExpand])
	return (
		<div
			className={cn(
				'flex-1 ml-60 transition-all ease-in-out duration-500',
				{ 'ml-20': isCollapsed }
			)}
		>
			{children}
		</div>
	)
}
