import { Navbar } from './_components/navbar'
import { PropsWithChildren } from 'react'

export default function LayoutBrowse({ children }: PropsWithChildren) {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	)
}
