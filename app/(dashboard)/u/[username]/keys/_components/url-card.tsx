import { CopyButton } from './copy-button'
import { Input } from '@/components/ui/input'

interface UrlCardProps {
	value?: string | null
}
export const UrlCard: React.FC<UrlCardProps> = ({ value }) => {
	return (
		<div className='p-6 bg-muted rounded-xl'>
			<div className='flex gap-x-10 items-center justify-between'>
				<h1 className='shrink-0 font-semibold text-xl'>Sever URl</h1>
				<div className='flex items-center w-full gap-x-6'>
					<Input
						value={value || ''}
						disabled
						placeholder='Server URL'
					/>
					<CopyButton value={value || ''} />
				</div>
			</div>
		</div>
	)
}
