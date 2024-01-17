import { IconMemo } from '../Icon'
import { Loader } from 'lucide-react'

interface LoadingVideoProps {
	label: string
}
export const LoadingVideo: React.FC<LoadingVideoProps> = ({ label }) => {
	return (
		<div className='h-full flex flex-col space-y justify-center items-center'>
			<IconMemo
				IconView={Loader}
				size='xl'
				className='animate-spin text-muted-foreground'
			/>
			<p className='text-muted-foreground capitalize'>{label}</p>
		</div>
	)
}
