'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { IconMemo } from '@/components/Icon'
import { Skeleton } from '@/components/ui/skeleton'
import { useSidebar } from '@/store/use-sidebar'

export const Toggle = () => {
	const { isCollapsed, onCollapsed, onExpand } = useSidebar(state => state)
	const label = isCollapsed ? 'Expand' : 'Collapse'
	return (
		<>
			{!isCollapsed ? (
				<div className='p-3 pl-6 mb-2 flex items-center w-full'>
					<p className='font-semibold text-primary animate-fade'>For you</p>
					<Hint label={label} asChild>
						<Button
							className='ml-auto p-2 h-auto'
							variant='ghost'
							onClick={onCollapsed}
						>
							<IconMemo IconView={ArrowLeftFromLine} />
						</Button>
					</Hint>
				</div>
			) : (
				<div className='hidden lg:flex mx-auto pt-4 mb-4'>
					<Hint label={label}>
						<Button
							className='p-2 h-auto'
							variant='ghost'
							onClick={onExpand}
						>
							<IconMemo IconView={ArrowRightFromLine} />
						</Button>
					</Hint>
				</div>
			)}
		</>
	)
}

export const ToggleSkeleton = () => {
	return (
		<div className='p-3 pl-6  mb-2 hidden lg:flex items-center justify-between w-full'>
			<Skeleton className='h-6  w-[100px]' />
			<Skeleton className='h-6  w-6' />
		</div>
	)
}
