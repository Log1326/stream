'use client'

import { Button } from '@/components/ui/button'
import { ChatInfo } from './chat-info'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface ChatFormProps {
	onSubmit: () => void
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	value: string
	isHidden: boolean
	isFollowing: boolean
	isDelayed?: boolean
	isFollowersOnly?: boolean
}

export const ChatForm: React.FC<ChatFormProps> = props => {
	const {
		isFollowing,
		isHidden,
		onChange,
		onSubmit,
		value,
		isDelayed,
		isFollowersOnly
	} = props
	const [isDelayBlocked, setIsDelayBlocked] = useState(false)
	const isFollowersOnlyNotFollowing = isFollowersOnly && !isFollowing
	const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyNotFollowing

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		event.stopPropagation()
		if (!value || isDisabled) return
		if (isDelayed && !isDelayBlocked) {
			setIsDelayBlocked(true)
			setTimeout(() => {
				onSubmit()
				setIsDelayBlocked(false)
			}, 3000)
		} else onSubmit()
	}
	if (isHidden) return null
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center gap-y-4 p-3 animate-fade'
		>
			<div className='w-full'>
				<ChatInfo
					isDelayed={isDelayed}
					isFollowersOnly={isFollowersOnly}
				/>
				<Input
					onChange={onChange}
					value={value}
					disabled={isDisabled}
					placeholder='Send a message'
					className={cn('border-white/10', {
						'rounded-t-none border-t-0': isFollowersOnly
					})}
				/>
			</div>
			<div className='ml-auto'>
				<Button
					type='submit'
					variant='primary'
					size='sm'
					disabled={isDisabled}
				>
					Chat
				</Button>
			</div>
		</form>
	)
}

export const ChatFormSkeleton = () => (
	<div className='flex flex-col items-center gap-y-4 p-3'>
		<Skeleton className='w-full h-10' />
		<div className='flex items-center gap-x-2 ml-auto'>
			<Skeleton className='h-12 w-16' />
		</div>
	</div>
)
