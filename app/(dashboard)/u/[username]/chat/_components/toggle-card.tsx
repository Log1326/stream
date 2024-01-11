'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { updateStream } from '@/actions/stream'
import { useTransition } from 'react'

type FieldTypes = 'isChatEnabled' | 'isChatDelayed' | 'isChatFollowersOnly'
interface ToggleCardProps {
	label: string
	value: boolean
	field: FieldTypes
}
export const ToggleCard: React.FC<ToggleCardProps> = ({
	label,
	value = false,
	field
}) => {
	const [pending, startTransition] = useTransition()
	const onChange = () => {
		startTransition(() => {
			updateStream({ [field]: !value })
				.then(() => toast.success('Chat settings updated'))
				.catch(() => toast.error('Something went wrong'))
		})
	}
	return (
		<div className='rounded-xl bg-muted p-6'>
			<div className='flex items-center justify-between'>
				<p className='font-semibold shrink-0'>{label}</p>
				<div className='space-y-2'>
					<Switch
						disabled={pending}
						onCheckedChange={onChange}
						checked={value}
					>
						{value ? 'On' : 'Off'}
					</Switch>
				</div>
			</div>
		</div>
	)
}
export const ToggleCardSkeleton = () => (
	<Skeleton className='rounded-xl p-10 w-full' />
)
