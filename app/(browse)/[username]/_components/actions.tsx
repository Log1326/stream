'use client'

import { onFollow, onUnFollowed } from '@/actions/follow'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useTransition } from 'react'

interface ActionsProps {
	isFollowing: boolean
	userId: string
}
export const Actions: React.FC<ActionsProps> = ({ isFollowing, userId }) => {
	const [isPending, startTransition] = useTransition()
	const handleOnFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then(data =>
					toast.success(
						`You are now following ${data?.following.username}`
					)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}
	const handleUnOnFollow = () => {
		startTransition(() => {
			onUnFollowed(userId)
				.then(data =>
					toast.success(
						`You are not following for ${data?.following.username} anymore`
					)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	}
	const onClick = () => (isFollowing ? handleUnOnFollow() : handleOnFollow())
	return (
		<Button disabled={isPending} onClick={onClick} variant='primary'>
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}
