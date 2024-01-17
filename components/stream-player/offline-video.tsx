import { IconMemo } from '../Icon'
import { WifiOff } from 'lucide-react'

interface OfflineVideoProps {
	username: string
}
export const OfflineVideo: React.FC<OfflineVideoProps> = ({ username }) => {
	return (
		<div className='h-full flex flex-col space-y justify-center items-center'>
			<IconMemo IconView={WifiOff} />
			<p className='text-muted-foreground'>{username} is offline</p>
		</div>
	)
}
