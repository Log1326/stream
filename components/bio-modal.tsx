'use client'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from './ui/dialog'
import { useRef, useState, useTransition } from 'react'

import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { toast } from 'sonner'
import { updateUser } from '@/actions/user'

interface BioModalProps {
	initialValue: Nullable<string>
}

export const BioModal: React.FC<BioModalProps> = ({ initialValue }) => {
	const [value, setValue] = useState<string>(initialValue || '')
	const refClose = useRef<HTMLButtonElement>(null)
	const [isPending, reRender] = useTransition()

	const onSend = () =>
		reRender(() => {
			updateUser({ bio: value })
				.then(() => {
					toast.success('User bio updated')
					refClose.current?.click()
				})
				.catch(() => toast.error('Something went wrong'))
		})
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSend()
	}

	const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		setValue(event.target.value)
	const handleOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) =>
		event.key === 'Enter' && onSend()
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='link' size='sm' className='ml-auto'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit user bio</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className='space-y-4'>
					<Textarea
						placeholder='User bio'
						onChange={onChange}
						onKeyDown={handleOnKeyDown}
						value={value}
						disabled={isPending}
						className='resize-none'
					/>
					<div className='flex justify-between'>
						<DialogClose ref={refClose} asChild>
							<Button type='button' variant='ghost'>
								Cancel
							</Button>
						</DialogClose>
						<Button
							disabled={isPending}
							type='submit'
							variant='primary'
						>
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
