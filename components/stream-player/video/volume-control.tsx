'use client'

import { Volume, Volume2, VolumeX } from 'lucide-react'

import { Hint } from '../../hint'
import { IconMemo } from '../../Icon'
import { Slider } from '../../ui/slider'

interface VolumeControlProps {
	onToggle: () => void
	onChange: (value: number) => void
	value: number
}
export const VolumeControl: React.FC<VolumeControlProps> = ({
	onChange,
	onToggle,
	value
}) => {
	const isMuted = value === 0,
		isAboveHalf = value > 50
	const label = isMuted ? 'Unmute' : 'Mute'
	const handleChange = (value: number[]) => onChange(value[0])
	let icon = Volume
	if (isMuted) icon = VolumeX
	else if (isAboveHalf) icon = Volume2
	return (
		<div className='flex items-center gap-2'>
			<Hint label={label} asChild>
				<button
					onClick={onToggle}
					className='text-white hover:bg-white/10 p-1.5 rounded-lg'
				>
					<IconMemo IconView={icon} size='sm' />
				</button>
			</Hint>
			<Slider
				className='w-32 cursor-pointer'
				onValueChange={handleChange}
				value={[value]}
				max={100}
				step={1}
			/>
		</div>
	)
}
