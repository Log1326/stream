import { RefObject, useCallback, useState } from 'react'

import { useEventListener } from 'usehooks-ts'

type useFullscreenType = [boolean,() => void]
export const useFullscreen = <T extends HTMLDivElement>(
	ref: RefObject<T>
): useFullscreenType => {
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
	const onToggle = useCallback(() => {
		if (isFullscreen) {
			document.exitFullscreen()
			setIsFullscreen(true)
		}
		if (ref.current) ref.current.requestFullscreen()
	}, [isFullscreen, ref])

	const handleFullscreenChange = () => {
		const isCurrentlyFullscreen = document.fullscreenElement !== null
		setIsFullscreen(isCurrentlyFullscreen)
	}

	useEventListener('fullscreenchange', handleFullscreenChange, ref)
	return [isFullscreen, onToggle]
}
