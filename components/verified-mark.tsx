import { Check } from 'lucide-react'
import { IconMemo } from './Icon'

export const VerifiedMark = () => (
	<div className='p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600'>
		<IconMemo IconView={Check} className='text-primary stroke-[4px]' />
	</div>
)
