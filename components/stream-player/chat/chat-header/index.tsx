'use client'

import { ChatToggle } from './chat-toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { VariantToggle } from './variant-toggle'

export const ChatHeader = () => {
	return (
		<div className='relative p-3 border-b'>
			<div className='absolute left-2 top-2 hidden lg:block'>
				<ChatToggle />
			</div>
			<p className='font-semibold text-primary text-center'>
				Stream Chat
			</p>
			<div className='absolute top-2 right-2'>
				<VariantToggle />
			</div>
		</div>
	)
}

export const ChatHeaderSkeleton = () => (
	<div className='relative border-b mt-4 hidden md:block'>
		<Skeleton className='absolute h-8 w-8 left-3 top-0' />
		<Skeleton className='w-28 h-8 mb-4 mx-auto' />
	</div>
)
