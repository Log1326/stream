import { UserButton } from '@clerk/nextjs'

export default function Home() {
	return (
		<div className='flex justify-center h-full'>
			<UserButton afterSignOutUrl='/sign-in' />
			<div className='flex text-blue-50'>Home Page</div>
		</div>
	)
}
