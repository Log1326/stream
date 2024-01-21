'use client'

import { ChatForm, ChatFormSkeleton } from './inner-chat/chat-form'
import { ChatHeader, ChatHeaderSkeleton } from './chat-header'
import { ChatList, ChatListSkeleton } from './inner-chat/chat-list'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
	useChat,
	useConnectionState,
	useRemoteParticipant
} from '@livekit/components-react'

import { ChatCommunity } from './community-chat/chat-community'
import { ConnectionState } from 'livekit-client'
import { Skeleton } from '@/components/ui/skeleton'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { useMediaQuery } from 'usehooks-ts'

interface ChatProps {
	viewerName: string
	hostName: string
	hostIdentity: string
	isFollowing: boolean
	isChatEnabled?: boolean
	isChatDelayed?: boolean
	isChatFollowersOnly?: boolean
}
export const Chat: React.FC<ChatProps> = props => {
	const {
		hostIdentity,
		hostName,
		isChatDelayed,
		isChatEnabled,
		isChatFollowersOnly,
		isFollowing,
		viewerName
	} = props
	const [value, setValue] = useState<string>('')

	const matches = useMediaQuery(`(max-width:1024px)`)
	const { variant, onExpand } = useChatSidebar(state => state)
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostIdentity)
	const { chatMessages: messages, send } = useChat()

	const isOnline =
			participant && connectionState === ConnectionState.Connected,
		isHidden = !isChatEnabled || !isOnline,
		isChat = variant === 'chat',
		isCommunity = variant === 'community'

	useEffect(() => {
		if (matches) onExpand()
	}, [matches, onExpand])

	const reversedMessages = useMemo(
		() => messages.sort((a, b) => b.timestamp - a.timestamp),
		[messages]
	)

	const onSubmit = useCallback(() => {
		if (!send) return
		send(value)
		setValue('')
	}, [send, value])

	const onChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) =>
			setValue(event.target.value),
		[]
	)
	return (
		<div className='flex flex-col bg-background border-l border-b h-full'>
			<ChatHeader />
			{isChat && (
				<>
					<ChatList messages={reversedMessages} isHidden={isHidden} />
					<ChatForm
						onSubmit={onSubmit}
						value={value}
						onChange={onChange}
						isHidden={isHidden}
						isFollowing={isFollowing}
						isDelayed={isChatDelayed}
						isFollowersOnly={isChatFollowersOnly}
					/>
				</>
			)}
			{isCommunity && (
				<ChatCommunity
					viewerName={viewerName}
					hostName={hostName}
					isHidden={isHidden}
				/>
			)}
		</div>
	)
}

export const ChatSkeleton = () => (
	<div className='flex flex-col border-l border-b h-full border-2'>
		<ChatHeaderSkeleton />
		<ChatListSkeleton />
		<ChatFormSkeleton />
	</div>
)
