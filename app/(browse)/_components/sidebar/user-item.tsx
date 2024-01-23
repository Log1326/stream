import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LiveBadge } from '@/components/live-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { User } from '@prisma/client'
import { UserAvatar } from '@/components/user-avatar'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/store/use-sidebar'

interface UserItemProps {
	user: User
	isLive?: boolean
}
export const UserItem: React.FC<UserItemProps> = ({ user, isLive }) => {
	const pathname = usePathname()
	const { isCollapsed } = useSidebar(state => state)
	const href = `/${user.username}`,
		isActive = pathname.includes(href)
	return (
		<Button
			asChild
			variant='ghost'
			className={cn(
				'w-full h-12',
				isCollapsed ? 'justify-center' : 'justify-start',
				isActive && 'bg-accent'
			)}
		>
			<Link href={href}>
				<div
					className={cn(
						'flex items-center justify-start w-full gap-x-2',
						{ 'justify-between': isLive }
					)}
				>
					<UserAvatar
						imageUrl={user.imageUrl}
						username={user.username}
						isLive={isLive}
					/>
					{!isCollapsed && (
						<p className='truncate'>{user.username}</p>
					)}
					{!isCollapsed && isLive && (
						<LiveBadge className='ml-auto' />
					)}
				</div>
			</Link>
		</Button>
	)
}
export const UserItemSkeleton = () => (
	<li className='flex items-center gap-x-3 px-3 py-2'>
		<Skeleton className='min-h-[32px] min-w-[32px] rounded-full' />
		<div className='flex-1'>
			<Skeleton className='h-6' />
		</div>
	</li>
)
