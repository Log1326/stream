import Image from 'next/image'
import { Poppins } from 'next/font/google'
const font = Poppins({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '600', '700', '800']
})
export const Logo = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-y-4'>
			<div className='bg-white rounded-full'>
				<Image src='/spooky.svg' alt='logo' height={80} width={80} />
			</div>
			<div className={font.className}>
				<p className='font-semibold text-xl'>Gamehub</p>
				<p className='text-sm text-muted-foreground text-center mb-4'>Let&apos;s play</p>
			</div>
		</div>
	)
}
