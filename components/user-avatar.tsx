import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { LiveBadge } from './live-badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

const avatarSizes = cva('', {
	variants: {
		size: {
			default: 'h-8 w-8',
			lg: 'h-14 w-14',
			xl: 'h-20 w-20',
			'2xl': 'h-32 w-32'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
	username: string
	imageUrl: string
	isLive?: boolean
	showBadge?: boolean
}
export const UserAvatar: React.FC<UserAvatarProps> = ({
	username,
	imageUrl,
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
				<AvatarImage src={imageUrl} className='object-cover' />
				<AvatarFallback>
					{`${username?.[0]} ${username?.[username.length - 1]}`}
				</AvatarFallback>
			</Avatar>
			{canShowBadge && (
				<div className='absolute inset-x-0 top-10'>
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
