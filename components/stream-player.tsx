'use client'

import { Stream, User } from '@prisma/client'

import { IconMemo } from '@/components/Icon'
import { Loader2 } from 'lucide-react'
import { useViewerToken } from '@/hooks/use-viewer.token'

interface StreamPlayerProps {
	user: User
	stream: Nullable<Stream>
	isFollowing: boolean
}
export const StreamPlayer: React.FC<StreamPlayerProps> = ({
	stream,
	user,
	isFollowing
}) => {
	const { identity, name, token, isLoading, isPending } = useViewerToken(
		user.id
	)

	if (isLoading)
		return (
			<div className='w-full h-full grid place-content-center'>
				<IconMemo
					IconView={Loader2}
					size='xl'
					className='animate-spin'
				/>
			</div>
		)
	if (!isLoading && isPending)
		return (
			<div className='w-full h-full grid place-content-center'>
				<h1 className='font-semibold text-xl'>
					Wait a minute.
					<br />
					Booting .. .
				</h1>
			</div>
		)
	return <div>Stream is allowed</div>
}
