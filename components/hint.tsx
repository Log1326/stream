import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from './ui/tooltip'

import { PropsWithChildren } from 'react'

interface HintProps extends PropsWithChildren {
	label: string
	asChild?: boolean
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
}
export const Hint: React.FC<HintProps> = ({
	label,
	align = 'center',
	asChild = false,
	side = 'right',
	children
}) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={150}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className='text-black bg-white'
					side={side}
					align={align}
				>
					<p className='font-semibold'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
