import { Button, buttonVariants } from '@/components/ui/button'

import Link from 'next/link'

export default function NotFoundPage() {
	return (
		<div
			className={`h-full flex flex-col space-y-4 items-center
         justify-center text-muted-foreground select-none`}
		>
			<h1>404</h1>
			<p>We couldn&apos;t find the user you were looking for.</p>
			<Link
				className={buttonVariants({ variant: 'secondary' })}
				href={'/'}
			>
				Go back home
			</Link>
		</div>
	)
}
