'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { IconMemo } from '@/components/Icon'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

export const Toggle = () => {
	const { isCollapsed, onExpand, onCollapsed } = useCreatorSidebar(
		state => state
	)
	const label = isCollapsed ? 'Expand' : 'Collapse'

	return (
		<>
			{!isCollapsed ? (
				<div className='p-3 pl-6 mb-2 flex items-center w-full animate-fade'>
					<p className='font-semibold text-primary '>
						Dashboard
					</p>
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
