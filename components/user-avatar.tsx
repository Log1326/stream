import { User } from '@prisma/client'
import { cva, type VariantProps } from 'class-variance-authority'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import { LiveBadge } from './live-badge'
import { Skeleton } from './ui/skeleton'

const avatarSizes = cva('', {
	variants: {
		size: {
			default: 'h-8 w-8',
			lg: 'h-14 w-14'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
	user: User
	isLive?: boolean
	showBadge?: boolean
}
export const UserAvatar: React.FC<UserAvatarProps> = ({
	user,
	isLive,
	showBadge,
	size
}) => {
	const canShowBadge = showBadge && isLive
	return (
		<div className='relative'>
			<Avatar
				className={cn(
					{ 'ring-2 ring-red-500 border border-background': isLive },
					avatarSizes({ size })
				)}
			>
				<AvatarImage src={user.imageUrl} className='object-cover' />
				<AvatarFallback>
					{`${user.username[0]} ${
						user.username[user.username.length - 1]
					}`}
				</AvatarFallback>
			</Avatar>
			{canShowBadge && (
				<div className='absolute inset-x-0 top-6'>
					<LiveBadge />
				</div>
			)}
		</div>
	)
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {}
export const UserAvatarSkeleton: React.FC<UserAvatarSkeletonProps> = ({
	size
}) => {
	return <Skeleton className={cn('rounded-full', avatarSizes({ size }))} />
}
