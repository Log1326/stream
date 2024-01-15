import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingDashboard() {
	return (
		<div className='p-6'>
			<div className='flex gap-x-10 items-center justify-around mb-4'>
				<Skeleton className='h-10 w-36 shrink-0' />
				<Skeleton className='h-10 w-52' />
			</div>
			<Skeleton className='h-16 w-full mb-4' />
			<Skeleton className='h-20 w-full' />
		</div>
	)
}
