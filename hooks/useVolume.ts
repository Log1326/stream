import { RefObject, useCallback, useEffect, useState } from 'react'

type useVolumeType = [number, (value: number) => void, () => void]
export const useVolume = <T extends HTMLVideoElement>(
	ref: RefObject<T>
): useVolumeType => {
	const [volume, setVolume] = useState<number>(0)

	const onVolumeChange = useCallback(
		(value: number) => {
			setVolume(value)
			if (ref.current) {
				ref.current.muted = value === 0
				ref.current.volume = +value * 0.01
			}
		},
		[ref]
	)
	const toggleMute = useCallback(() => {
		const isMuted = volume === 0
		setVolume(isMuted ? 50 : 0)
		if (ref.current) {
			ref.current.muted = !isMuted
			ref.current.volume = isMuted ? 0.5 : 0
		}
	}, [ref, volume])

	useEffect(() => {
		onVolumeChange(0)
	}, [onVolumeChange])

	return [volume, onVolumeChange, toggleMute]
}
