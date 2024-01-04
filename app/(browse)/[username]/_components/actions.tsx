'use client'

import { Button } from '@/components/ui/button'
import { onFollow } from '@/actions/follow'
import { toast } from 'sonner'
import { useTransition } from 'react'
interface ActionsProps {
	isFollowing: boolean
	userId: string
}
export const Actions: React.FC<ActionsProps> = ({ isFollowing, userId }) => {
	const [isPending, startTransition] = useTransition()
	const onClick = () => {
		startTransition(() => {
			onFollow(userId)
				.then(data =>
					toast.success(
						`You are now following ${data?.following.username}`
					)
				)
				.catch(err => toast.error('Something went wrong'))
		})
	}
	return (
		<Button
			disabled={isFollowing || isPending}
			onClick={onClick}
			variant='primary'
		>
			Follow
		</Button>
	)
}
