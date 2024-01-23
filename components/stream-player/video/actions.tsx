'use client'

import { onFollow, onUnFollowed } from '@/actions/follow'

import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { IconMemo } from '@/components/Icon'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

interface ActionsProps {
	isFollowing: boolean
	hostIdentity: string
	isHost: boolean
}
export const Actions: React.FC<ActionsProps> = ({
	hostIdentity,
	isFollowing,
	isHost
}) => {
	const [isPending, reRender] = useTransition()
	const { push } = useRouter()
	const { userId } = useAuth()
	const toggleFollow = () => {
		if (!userId) return push('/sign/in')
		if (isHost) return
		const follow = () =>
			reRender(() => {
				onFollow(hostIdentity)
					.then(data =>
						toast.success(
							`You are following ${data.following.username}`
						)
					)
					.catch(() => toast.error('Something went wrong'))
			})

		const unFollow = () =>
			reRender(() => {
				onUnFollowed(hostIdentity)
					.then(data =>
						toast.success(
							`You have unfollowing ${data.following.username}`
						)
					)
					.catch(() => toast.error('Something went wrong'))
			})

		isFollowing ? unFollow() : follow()
	}
	return (
		<Button
			onClick={toggleFollow}
			disabled={isPending || isHost}
			variant='primary'
			size='sm'
			className='w-full sm:w-1/2 lg:w-auto px-4'
		>
			<IconMemo
				IconView={Heart}
				className={cn('fill-none mr-2', { 'fill-white': isFollowing })}
			/>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}

export const ActionsSkeleton = () => (
	<Skeleton className='h-10 min-w-28 w-1/2 lg:w-auto' />
)
