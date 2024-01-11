import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Clapperboard } from 'lucide-react'
import { IconMemo } from '@/components/Icon'
import Link from 'next/link'

export const Actions = async () => {
	const user = await currentUser()
	return (
		<div className='flex items-center gap-x-4'>
			{!user && (
				<SignInButton>
					<Button size='lg'>Login</Button>
				</SignInButton>
			)}
			{!!user && (
				<div className='flex justify-center items-center gap-x-4'>
					<Button
						asChild
						size='sm'
						variant='ghost'
						className='text-muted-foreground hover:text-primary'
					>
						<Link href={`/u/${user.username}`}>
							<IconMemo IconView={Clapperboard} />
							<span className='hidden lg:block'>Dashboard</span>
						</Link>
					</Button>
					<UserButton afterSignOutUrl='/' />
				</div>
			)}
		</div>
	)
}
