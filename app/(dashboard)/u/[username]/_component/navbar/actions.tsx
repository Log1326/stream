import { Button } from '@/components/ui/button'
import { IconMemo } from '@/components/Icon'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

export const Actions = async () => {
	return (
		<div className='flex items-center justify-end gap-x-2'>
			<Button
				size='sm'
				variant='ghost'
				className='text-muted-foreground hover:text-primary'
				asChild
			>
				<Link href={'/'}>
					<IconMemo IconView={LogOut} className='mr-2' />
					Exit
				</Link>
			</Button>
			<UserButton afterSignOutUrl='/' />
		</div>
	)
}
