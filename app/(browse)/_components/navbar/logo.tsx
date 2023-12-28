import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
const font = Poppins({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800']
})
export const Logo = () => {
	return (
		<Link href='/'>
			<div className='hidden lg:flex items-center gap-x-4 hover:opacity-75 transition'>
				<div className='bg-white rounded-full'>
					<Image
						src='/spooky.svg'
						alt='logo'
						height={32}
						width={32}
					/>
				</div>
				<div className={font.className}>
					<p className='font-semibold text-xl'>Gamehub</p>
					<p className='text-sm text-muted-foreground text-center mb-4'>
						Let&apos;s play
					</p>
				</div>
			</div>
		</Link>
	)
}
