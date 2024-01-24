'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Error() {
	return (
		<div
			className={`h-full flex flex-col space-y-4 items-center
         justify-center text-muted-foreground select-none`}
		>
			<p>Something went wrong</p>
			<Link
				className={buttonVariants({ variant: 'secondary' })}
				href={'/'}
			>
				Go back home
			</Link>
		</div>
	)
}
