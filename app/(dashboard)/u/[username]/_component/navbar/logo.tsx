import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
const font = Poppins({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800']
})
export const Logo = () => {
	return (
		<Link href='/'>
			<div className='flex items-center gap-x-4 hover:opacity-75 transition'>
				<div className='bg-white rounded-full'>
					<Image
						src='/spooky.svg'
						alt='logo'
						height={32}
						width={32}
						className='min-w-[32px]'
					/>
				</div>
				<div className={cn(font.className, 'hidden lg:block')}>
					<p className='font-semibold text-xl'>Gamehub</p>
					<p className='text-sm text-muted-foreground text-center mb-4'>
						Creator dashboard
					</p>
				</div>
			</div>
		</Link>
	)
}
