import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { IconMemo } from '@/components/Icon'
import { useChatSidebar } from '@/store/use-chat-sidebar'

export const ChatToggle = () => {
	const { isCollapsed, onExpand, onCollapsed } = useChatSidebar(
		state => state
	)
	const icon = isCollapsed ? ArrowLeftFromLine : ArrowRightFromLine
	const label = isCollapsed ? 'Expand' : 'Collapse'
	const onToggle = () => (isCollapsed ? onExpand() : onCollapsed())

	return (
		<Hint label={label} side='left' asChild>
			<Button
				onClick={onToggle}
				className='h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent'
			>
				<IconMemo IconView={icon} />
			</Button>
		</Hint>
	)
}
