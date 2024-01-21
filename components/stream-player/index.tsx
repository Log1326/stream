'use client'

import { Chat, ChatSkeleton } from './chat'
import { Stream, User } from '@prisma/client'
import { Video, VideoSkeleton } from './video'

import { ChatToggle } from './chat/chat-header/chat-toggle'
import { LiveKitRoom } from '@livekit/components-react'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chat-sidebar'
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
	const { identity, isLoading, isPending, name, token } = useViewerToken(
		user.id
	)
	const { isCollapsed } = useChatSidebar(state => state)

	if (isLoading && isPending) return <StreamPlayerSkeleton />

	return (
		<>
			{isCollapsed && (
				<div className='fixed top-20 right-2'>
					<ChatToggle />
				</div>
			)}
			<LiveKitRoom
				token={token}
				serverUrl={serverUrl}
				className={cn(
					`transition-all ease-out duration-500 h-full grid place-content-center
					grid-cols-[2fr_0fr] lg:grid-cols-[2fr_1fr] 2xl:grid-cols-[4fr_2fr]`,
					{
						'lg:grid-cols-[2fr_0fr] 2xl:grid-cols-[6fr_0fr]':
							isCollapsed
					}
				)}
			>
				<div className='space-y-4 overflow-y-auto hidden-scrollbar h-full w-full'>
					<Video hostName={user.username} hostIdentity={user.id} />
				</div>

				<div className={cn('h-full', { hidden: isCollapsed })}>
					<Chat
						viewerName={name}
						hostName={user.username}
						hostIdentity={user.id}
						isFollowing={isFollowing}
						isChatEnabled={stream?.isChatEnabled}
						isChatDelayed={stream?.isChatDelayed}
						isChatFollowersOnly={stream?.isChatFollowersOnly}
					/>
				</div>
			</LiveKitRoom>
		</>
	)
}
export const StreamPlayerSkeleton = () => (
	<div
		className={`transition-all ease-out duration-500 h-full grid 
		grid-cols-[2fr_0fr] lg:grid-cols-[2fr_1fr] 2xl:grid-cols-[4fr_2fr]`}
	>
		<div className='space-y-4 overflow-y-auto hidden-scrollbar h-full'>
			<VideoSkeleton />
		</div>
		<div className='h-full'>
			<ChatSkeleton />
		</div>
	</div>
)
