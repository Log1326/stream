'use client'

import { useCallback, useState } from 'react'

import { Button } from '@/components/ui/button'
import { CopyButton } from './copy-button'
import { Input } from '@/components/ui/input'

interface KeyCardProps {
	value?: string | null
}
export const KeyCard: React.FC<KeyCardProps> = ({ value }) => {
	const [show, setShow] = useState(false)
	const onShow = () => setShow(prev => !prev)
	const viewShowOrHide = show ? 'Hide' : 'Show'
	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-start gap-x-10'>
				<p className='font-semibold shrink-0'>Stream key</p>
				<div className='space-y-2 w-full'>
					<div className='w-full flex items-center gap-x-2'>
						<Input
							value={value || ''}
							type={show ? 'text' : 'password'}
							disabled
							placeholder='Stream key'
						/>
						<CopyButton value={value || null} />
					</div>
					<Button size='sm' variant='link' onClick={onShow}>
						{viewShowOrHide}
					</Button>
				</div>
			</div>
		</div>
	)
}
