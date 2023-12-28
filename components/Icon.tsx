import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { memo } from 'react'

type Size = 'xs' | 'sm' | 'lg' | 'xl'
interface IconProps {
	IconView: LucideIcon
	size?: Size
	className?: string
	onClick?: () => void
}
const SizeObj: Record<Size, string> = {
	xs: 'w-5 h-5',
	sm: 'w-7 h-7 p-1',
	lg: 'w-10 h-10 p-1',
	xl: 'w-20 h-20 p-4'
}
export const IconMemo = memo<IconProps>(
	({ IconView, size = 'xs', className, onClick }) => (
		<IconView
			onClick={onClick}
			className={cn(
				'cursor-pointer text-muted-foreground hover:opacity-75 transition duration-500',
				className,
				SizeObj[size]
			)}
		/>
	)
)

IconMemo.displayName = 'IconMemo'
