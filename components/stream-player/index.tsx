'use client'

import { Stream, User } from '@prisma/client'

import { IconMemo } from '@/components/Icon'
import { LiveKitRoom } from '@livekit/components-react'
import { Loader2 } from 'lucide-react'
import { Video } from './video'
import { useViewerToken } from '@/hooks/use-viewer.token'

interface StreamPlayerProps {
	user: User
	stream: Nullable<Stream>
	isFollowing: boolean
}
const serverUrl = process.env.NEXT_PUBLIC_LIVE_KIT_WS_URL as string
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
	return (
		<>
			<LiveKitRoom token={token} serverUrl={serverUrl} className='grid h-full'>
				<div className=''>
					<Video hostName={user.username} hostIdentity={user.id} />
				</div>
			</LiveKitRoom>
		</>
	)
}
