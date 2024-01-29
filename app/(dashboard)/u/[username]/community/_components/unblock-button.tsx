'use client'

import { Button } from '@/components/ui/button'
import { onUnblock } from '@/actions/block'
import { toast } from 'sonner'
import { useTransition } from 'react'
interface UnblockButtonProps {
	userId: string
}
export const UnblockButton: React.FC<UnblockButtonProps> = ({ userId }) => {
	const [isPending, reRender] = useTransition()
	const onClick = () =>
		reRender(() => {
			onUnblock(userId)
				.then(res =>
					toast.success(`User ${res.blocked.username} unblocked`)
				)
				.catch(() => toast.error('Something went wrong'))
		})
	return (
		<Button
			disabled={isPending}
			variant='outline'
			size='sm'
			onClick={onClick}
		>
			unblock
		</Button>
	)
}
