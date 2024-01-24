'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '../ui/accordion'
import { Chat, ChatSkeleton } from './chat'
import { Stream, User } from '@prisma/client'
import { Video, VideoSkeleton } from './video'
import { VideoHeader, VideoHeaderSkeleton } from './video/video-header'

import { AboutCard } from './card/about-card'
import { ChatToggle } from './chat/chat-header/chat-toggle'
import { InfoCard } from './card/info-card'
import { LiveKitRoom } from '@livekit/components-react'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { useViewerToken } from '@/hooks/use-viewer.token'

interface StreamPlayerProps {
	user: Additional<
		User & {
			stream: Nullable<Stream>
			_count: { followedBy: number }
		}
	>
	isFollowing: boolean
}
const serverUrl = process.env.NEXT_PUBLIC_LIVE_KIT_WS_URL as string
export const StreamPlayer: React.FC<StreamPlayerProps> = ({
	user,
	isFollowing
}) => {
	const { identity, isLoading, isPending, name, token } = useViewerToken(
		user.id
	)
	const { isCollapsed } = useChatSidebar(state => state)

	if (isLoading && isPending) return <StreamPlayerSkeleton />

	return (
		<div className='h-full'>
			{isCollapsed && (
				<div className='fixed top-20 z-50 right-2'>
					<ChatToggle />
				</div>
			)}
			<LiveKitRoom
				token={token}
				serverUrl={serverUrl}
				className={cn(
					`transition-all
					hidden-scrollbar
					 ease-out duration-500 h-full grid
					grid-cols-1 lg:grid-cols-[2fr_1fr] 2xl:grid-cols-[4fr_2fr]`,
					{
						'lg:grid-cols-[2fr_0fr] 2xl:grid-cols-[6fr_0fr]':
							isCollapsed
					}
				)}
			>
				<div
					className={`p-4 flex flex-col items-center overflow-y-auto
						hidden-scrollbar h-full w-full`}
				>
					<Video hostName={user.username} hostIdentity={user.id} />

					<VideoHeader
						hostName={user.username}
						hostIdentity={user.id}
						viewerIdentity={identity}
						imageUrl={user.imageUrl}
						isFollowing={isFollowing}
						name={user.stream?.name}
					/>
					<Accordion type='single' collapsible className='w-full'>
						<AccordionItem value='info-user'>
							<AccordionTrigger className='hover:no-underline font-semibold text-lg'>
								Info
							</AccordionTrigger>
							<AccordionContent>
								<InfoCard
									hostIdentity={user.id}
									viewerIdentity={identity}
									name={user.stream?.name}
									thumbnailUrl={user.stream?.thumbnailUrl}
								/>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value='about-user'>
							<AccordionTrigger className='hover:no-underline font-semibold text-lg'>
								About
							</AccordionTrigger>
							<AccordionContent>
								<AboutCard
									hostName={user.username}
									hostIdentity={user.id}
									viewerIdentity={identity}
									bio={user.bio}
									followedByCount={user._count.followedBy}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>

				<div
					className={cn('h-full overflow-y-auto', {
						hidden: isCollapsed
					})}
				>
					<Chat
						viewerName={name}
						hostName={user.username}
						hostIdentity={user.id}
						isFollowing={isFollowing}
						isChatEnabled={user.stream?.isChatEnabled}
						isChatDelayed={user.stream?.isChatDelayed}
						isChatFollowersOnly={user.stream?.isChatFollowersOnly}
					/>
				</div>
			</LiveKitRoom>
		</div>
	)
}

export const StreamPlayerSkeleton = () => (
	<div
		className={`transition-all ease-out duration-500 h-full grid 
		grid-cols-1 lg:grid-cols-[2fr_1fr] 2xl:grid-cols-[4fr_2fr]`}
	>
		<div className='w-full h-full p-4'>
			<VideoSkeleton />
			<VideoHeaderSkeleton />
		</div>
		<div className='h-full border-t-2 mt-6 lg:mt-2 lg:border-none'>
			<ChatSkeleton />
		</div>
	</div>
)
