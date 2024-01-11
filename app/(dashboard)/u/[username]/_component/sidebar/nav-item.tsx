'use client'

import { Button } from '@/components/ui/button'
import { IconMemo } from '@/components/Icon'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { TypeRoutes } from './navigation'
import { cn } from '@/lib/utils'
import { useCreatorSidebar } from '@/store/use-creator-sidebar'

interface NavItemProps {
	data: TypeRoutes
	isActive?: boolean
}
export const NavItem: React.FC<NavItemProps> = ({ data, isActive }) => {
	const { isCollapsed } = useCreatorSidebar(state => state)
	return (
		<Button
			asChild
			variant='ghost'
			className={cn('w-full h-12 justify-start', {
				'justify-center': isCollapsed,
				'bg-accent': isActive
			})}
		>
			<Link href={data.href}>
				<div className='flex items-center gap-x-4'>
					<IconMemo
						IconView={data.icon}
						className={cn('mr-2', { 'mr-0': isCollapsed })}
					/>
					{!isCollapsed && (
						<span className='animate-fade'>{data.label}</span>
					)}
				</div>
			</Link>
		</Button>
	)
}
export const NavItemSkeleton = () => (
	<li className='flex items-center gap-x-4 px-3 py-2'>
		<Skeleton className='min-h-[48px] min-w-[48px] rounded-md' />
		<div className='flex-1 hidden lg:block'>
			<Skeleton className='h-6' />
		</div>
	</li>
)
