import { Logo } from './_components/logo'

export default function LayoutAuth({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<div className='h-screen grid place-content-center'>
			<Logo />
			{children}
		</div>
	)
}
