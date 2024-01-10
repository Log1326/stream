'use client'

import { onBlock, onUnblock } from '@/actions/block'
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
	const isBlock = false
	const handleOnFollow = () => {
		startTransition(() => {
			onFollow(userId)
				.then(data =>
					toast.success(
						`You are now following ${data?.following.username}`
					)
				)
				.catch(() => toast.error('Something went wrong follow'))
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
				.catch(() => toast.error('Something went wrong unfollow'))
		})
	}
	const handleOnBlock = () => {
		startTransition(() => {
			onBlock(userId)
				.then(data =>
					toast.success(`Block the user: ${data?.blocked.username}`)
				)
				.catch(() => toast.error('Something went wrong block'))
		})
	}
	const handleOnUnblock = () => {
		startTransition(() => {
			onUnblock(userId)
				.then(data =>
					toast.success(`Unblock the user :${data?.blocked.username}`)
				)
				.catch(() => toast.error('Something went wrong unblock'))
		})
	}
	const onClickFollow = () =>
		isFollowing ? handleUnOnFollow() : handleOnFollow()
	const onClickBlock = () => (isBlock ? handleOnUnblock() : handleOnBlock())
	return (
		<>
			<Button
				disabled={isPending}
				onClick={onClickFollow}
				variant='primary'
			>
				{isFollowing ? 'Unfollow' : 'Follow'}
			</Button>
			<Button
				disabled={isPending}
				onClick={onClickBlock}
				variant='default'
			>
				{isBlock ? 'Unblock' : 'Block'}
			</Button>
		</>
	)
}
