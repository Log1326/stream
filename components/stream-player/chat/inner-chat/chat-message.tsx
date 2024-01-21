import { ReceivedChatMessage } from '@livekit/components-react'
import { format } from 'date-fns'
import { stringToColor } from '@/lib/utils'
interface ChatMessageProps {
	data: ReceivedChatMessage
}
export const ChatMessage: React.FC<ChatMessageProps> = ({ data }) => {
	const color = stringToColor(data.from?.name || '')
	return (
		<div className='fle gap-2 p-2 rounded-md hover:bg-white/5'>
			<p>{format(data.timestamp, 'HH:MM')}</p>
			<div className='flex flex-wrap items-baseline gap-2 grow'>
				<p className='text-sm font-semibold whitespace-nowrap'>
					<span className='truncate' style={{ color }}>
						{data.from?.name}:
					</span>
				</p>
				<p className='text-sm break-all'>{data.message}</p>
			</div>
		</div>
	)
}
