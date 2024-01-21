'use client'

import { useDeferredValue, useMemo, useState } from 'react'

import { CommunityItem } from './community-item'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useParticipants } from '@livekit/components-react'
import { LocalParticipant, RemoteParticipant } from 'livekit-client'

interface ChatCommunityProps {
	viewerName: string
	hostName: string
	isHidden: boolean
}
export const ChatCommunity: React.FC<ChatCommunityProps> = ({
	hostName,
	isHidden,
	viewerName
}) => {
	const [value, setValue] = useState<string>('')
	const deferredValue = useDeferredValue<string>(value)
	const participants = useParticipants()

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setValue(event.target.value)

	const filteredParticipants = useMemo(() => {
		const deduplicated = participants.reduce(
			(acc, participant) => {
				const hostLikeViewer = `host-${participant.identity}`
				if (!acc.some(p => p.identity === hostLikeViewer))
					acc.push(participant)
				return acc
			},
			[] as (RemoteParticipant | LocalParticipant)[]
		)
		return deduplicated.filter(
			item =>
				item.name?.toLowerCase().includes(deferredValue.toLowerCase())
		)
	}, [deferredValue, participants])

	if (isHidden)
		return (
			<div className='flex flex-1 items-center justify-center'>
				<p className='text-sm text-muted-foreground'>
					Community is disabled
				</p>
			</div>
		)

	return (
		<div className='p-4'>
			<Input onChange={onChange} placeholder='Search community' />
			<ScrollArea className='gap-y-2 mt-4'>
				<p className='text-center text-sm text-muted-foreground hidden last:block'>
					No Results
				</p>
				{filteredParticipants.map(participant => (
					<CommunityItem
						key={participant.identity}
						hostName={hostName}
						viewerName={viewerName}
						participantName={participant.name}
						participantIdentity={participant.identity}
					/>
				))}
			</ScrollArea>
		</div>
	)
}
