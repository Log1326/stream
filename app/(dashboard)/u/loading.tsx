import { IconMemo } from '@/components/Icon'
import { Loader2 } from 'lucide-react'

export default function LoadingDashboardByUsername() {
	return (
		<div className='w-full h-full grid place-content-center'>
			<IconMemo IconView={Loader2} size='xl' className='animate-spin' />
		</div>
	)
}
