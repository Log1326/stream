'use client'

import { ConnectionState, Track } from 'livekit-client'
import {
	useConnectionState,
	useRemoteParticipant,
	useTracks
} from '@livekit/components-react'

import { LiveVideo } from './live-video'
import { LoadingVideo } from './loading-video'
import { OfflineVideo } from './offline-video'
import { Skeleton } from '@/components/ui/skeleton'

interface VideoProps {
	hostName: string
	hostIdentity: string
}

export const Video: React.FC<VideoProps> = ({ hostIdentity, hostName }) => {
	const connectionState = useConnectionState()
	const participant = useRemoteParticipant(hostIdentity)
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone
	]).filter(track => track.participant.identity === hostIdentity)
	let content
	if (!participant && connectionState === ConnectionState.Connected)
		content = <OfflineVideo username={hostName} />
	else if (!participant || tracks.length === 0)
		content = <LoadingVideo label={connectionState} />
	else content = <LiveVideo participant={participant} />
	return (
		<div className='grid place-content-center group relative h-full'>
			{content}
		</div>
	)
}

export const VideoSkeleton = () => (
	<div className='aspect-video border-x border-background'>
		<Skeleton className='h-full w-full rounded-none' />
	</div>
)
