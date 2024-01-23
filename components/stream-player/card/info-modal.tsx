'use client'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { useRef, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { IconMemo } from '@/components/Icon'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash } from 'lucide-react'
import { UploadDropzone } from '@/lib/uploadthing'
import { UploadFileResponse } from 'uploadthing/client'
import { toast } from 'sonner'
import { updateStream } from '@/actions/stream'
import { useRouter } from 'next/navigation'

interface InfoCardProps {
	initialName?: string
	initialThumbnailUrl?: Nullable<string>
}
export const InfoModal: React.FC<InfoCardProps> = ({
	initialName,
	initialThumbnailUrl
}) => {
	const [value, setValue] = useState<string | undefined>(initialName)
	const [thumbnailUrl, setThumbnailUrl] =
		useState<Nullable<string | undefined>>(initialThumbnailUrl)
	const refClose = useRef<HTMLButtonElement>(null)
	const [isPending, reRender] = useTransition()
	const { refresh } = useRouter()

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		reRender(() => {
			updateStream({ name: value })
				.then(() => {
					toast.success('Stream updated')
					refClose?.current?.click()
				})
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setValue(event.target.value)

	const onUpload = (value: UploadFileResponse<{ fileUrl: string }>[]) => {
		setThumbnailUrl(value[0].url)
		refClose?.current?.click()
		return refresh()
	}
	const onRemove = () =>
		reRender(() => {
			updateStream({ thumbnailUrl: null })
				.then(() => {
					toast.success('The Image deleted')
					setThumbnailUrl('')
				})
				.catch(() => toast.error('Something went wrong'))
		})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='link' size='sm' className='ml-auto'>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit stream info</DialogTitle>
					<form onSubmit={onSubmit} className='space-y-14'>
						<div className='space-y-2'>
							<Label>Name</Label>
							<Input
								placeholder='Stream name'
								onChange={onChange}
								value={value}
								disabled={false}
							/>
						</div>
						<div className='space-y-2'>
							<Label>Thumbnail</Label>
							{thumbnailUrl ? (
								<div
									className={`relative aspect-video rounded-xl 
									overflow-hidden border border-white/10`}
								>
									<div className='absolute top-2 right-2 z-10'>
										<Hint
											label='Remove thumbnail'
											side='left'
											asChild
										>
											<Button
												type='button'
												variant='destructive'
												disabled={isPending}
												onClick={onRemove}
												className='h-auto w-auto p-1.5'
											>
												<IconMemo IconView={Trash} />
											</Button>
										</Hint>
									</div>
									<Image
										loading='lazy'
										fill
										src={thumbnailUrl}
										alt='image'
										className='object-cover'
									/>
								</div>
							) : (
								<div className='rounded-xl border outline-dashed outline-muted'>
									<UploadDropzone
										endpoint='thumbnailUploader'
										appearance={{
											label: { color: '#FFF' },
											allowedContent: { color: '#FFF' }
										}}
										onClientUploadComplete={onUpload}
									/>
								</div>
							)}
						</div>
						<div className='flex justify-between'>
							<DialogClose ref={refClose} asChild>
								<Button type='button' variant='ghost'>
									Cancel
								</Button>
							</DialogClose>
							<Button
								variant='primary'
								type='submit'
								disabled={isPending}
							>
								Save
							</Button>
						</div>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
