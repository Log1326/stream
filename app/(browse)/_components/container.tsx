'use client'

import { PropsWithChildren, useEffect } from 'react'

import { cn } from '@/lib/utils'
import { useMediaQuery } from 'usehooks-ts'
import { useSidebar } from '@/store/use-sidebar'

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
	const { isCollapsed, onCollapsed, onExpand } = useSidebar(state => state)
	const matcher = useMediaQuery('(max-width: 1024px)')
	useEffect(() => {
		if (matcher) onCollapsed()
		else onExpand()
	}, [matcher, onCollapsed, onExpand])
	return (
		<div
			className={cn('ml-60 w-full transition-all ease-in-out duration-500', {
				'ml-20': isCollapsed
			})}
		>
			{children}
		</div>
	)
}
