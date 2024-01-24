import { cn, stringToColor } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { IconMemo } from '@/components/Icon'
import { MinusCircle } from 'lucide-react'
import { onBlock } from '@/actions/block'
import { toast } from 'sonner'
import { useTransition } from 'react'

interface CommunityItemProps {
	hostName: string
	viewerName: string
	participantName?: string
	participantIdentity: string
}
export const CommunityItem: React.FC<CommunityItemProps> = props => {
	const { hostName, participantIdentity, participantName, viewerName } = props
	const [isPending, reRender] = useTransition()
	const color = stringToColor(participantIdentity || ''),
		isSelf = participantName === viewerName,
		isHost = viewerName === hostName
	const handleBlock = () => {
		if (!participantName || isSelf || !isHost) return
		reRender(() => {
			onBlock(participantIdentity)
				.then(() => toast.success(`Blocked ${participantName}`))
				.catch(() => toast.error('Something went wrong'))
		})
	}
	return (
		<div
			className={cn(
				`group flex items-center justify-between w-full p-2 rounded-md
				 text-sm hover:bg-white/5`,
				{ 'opacity-50 pointer-events-none': isPending }
			)}
		>
			<p style={{ color }}>{participantName}</p>
			{isHost && !isSelf && (
				<Hint label='Block'>
					<Button
						variant='ghost'
						disabled={isPending}
						onClick={handleBlock}
						className={`h-auto w-auto p-1 opacity-0 
						group-hover:opacity-100 transition`}
					>
						<IconMemo
							IconView={MinusCircle}
							className='text-muted-foreground'
						/>
					</Button>
				</Hint>
			)}
		</div>
	)
}
