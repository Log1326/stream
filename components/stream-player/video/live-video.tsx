'use client'

import { Participant, Track } from 'livekit-client'

import { FullscreenControl } from './fullscreen-control'
import { VolumeControl } from './volume-control'
import { useFullscreen } from '@/hooks/useFullscreen'
import { useRef } from 'react'
import { useTracks } from '@livekit/components-react'
import { useVolume } from '@/hooks/useVolume'

interface LiveVideoProps {
	participant: Participant
}
export const LiveVideo: React.FC<LiveVideoProps> = ({ participant }) => {
	const refVideo = useRef<HTMLVideoElement>(null)
	const refWrapper = useRef<HTMLDivElement>(null)
	const [volume, onVolumeChange, toggleMute] = useVolume(refVideo)
	const [isFullscreen, onToggle] = useFullscreen(refWrapper)

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter(track => track.participant.identity === participant.identity)
		.forEach(track => {
			if (refVideo.current)
				track.publication.track?.attach(refVideo.current)
		})

	return (
		<div ref={refWrapper} className='relative h-full flex'>
			<video ref={refVideo} width='100%' />
			<div
				className={`absolute top-0 h-full w-full opacity-0
             hover:opacity-100 hover:transition-all`}
			>
				<div
					className={`absolute bottom-0 flex h-14 w-full items-center
                justify-between bg-gradient-to-r from-neutral-900 px-4`}
				>
					<VolumeControl
						onChange={onVolumeChange}
						onToggle={toggleMute}
						value={volume}
					/>
					<FullscreenControl
						isFullscreen={isFullscreen}
						onToggle={onToggle}
					/>
				</div>
			</div>
		</div>
	)
}
