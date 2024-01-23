'use client'

import { Actions, ActionsSkeleton } from './actions'
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar'
import {
	useParticipants,
	useRemoteParticipant
} from '@livekit/components-react'

import { IconMemo } from '@/components/Icon'
import { Skeleton } from '@/components/ui/skeleton'
import { UserIcon } from 'lucide-react'
import { VerifiedMark } from '@/components/verified-mark'

interface VideoHeaderProps {
	hostName: string
	hostIdentity: string
	viewerIdentity: string
	imageUrl: string
	isFollowing: boolean
	name?: string
}
export const VideoHeader: React.FC<VideoHeaderProps> = props => {
	const {
		hostIdentity,
		hostName,
		imageUrl,
		isFollowing,
		viewerIdentity,
		name
	} = props
	const participants = useParticipants()
	const participant = useRemoteParticipant(hostIdentity)
	const isLive = Boolean(participant),
		participantsLength = participants.length - 1,
		hostViewer = `host-${hostIdentity}`,
		isHost = viewerIdentity === hostViewer
	return (
		<div
			className={`flex flex-col border-t-2 lg:flex-row lg:items-center gap-y-4 lg:gap-y-0 items-start 
            justify-between px-4 w-full`}
		>
			<div className='flex items-center gap-x-3 mt-4'>
				<UserAvatar
					imageUrl={imageUrl}
					username={hostName}
					size='lg'
					isLive={isLive}
					showBadge
				/>
				<div className='space-y-1'>
					<div className='flex items-center gap-x-2'>
						<h2 className='text-lg font-semibold'>{hostName}</h2>
						<VerifiedMark />
					</div>
					<p className='text-sm font-semibold'>{name}</p>
					{isLive ? (
						<div className='font-semibold flex gap-x-1 items-center text-xs text-rose-500'>
							<IconMemo IconView={UserIcon} />
							<p>
								{participantsLength}
								{participantsLength === 1
									? 'viewer'
									: 'viewers'}
							</p>
						</div>
					) : (
						<p className='font-semibold text-xs text-muted-foreground'>
							Offline
						</p>
					)}
				</div>
			</div>
			<Actions
				isFollowing={isFollowing}
				hostIdentity={hostIdentity}
				isHost={isHost}
			/>
		</div>
	)
}

export const VideoHeaderSkeleton = () => (
	<div
		className={`flex flex-col lg:items-center border-t-2 lg:flex-row gap-y-4 mt-4 lg:gap-y-0 items-start 
            justify-between px-4`}
	>
		<div className='flex items-center gap-x-3'>
			<UserAvatarSkeleton size='xl' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-16 rounded-sm' />
				<Skeleton className='h-4 w-20 rounded-sm' />
				<Skeleton className='h-4 w-16 rounded-sm' />
			</div>
		</div>
		<ActionsSkeleton />
	</div>
)
