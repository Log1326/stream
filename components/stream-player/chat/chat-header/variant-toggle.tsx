import { MessageSquare, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Hint } from '@/components/hint'
import { IconMemo } from '@/components/Icon'
import { useChatSidebar } from '@/store/use-chat-sidebar'

export const VariantToggle = () => {
	const { variant, onChangeVariant } = useChatSidebar(state => state)
	const isChat = variant === 'chat',
		icon = isChat ? Users : MessageSquare,
		label = isChat ? 'Community' : 'Chat'
	const onToggle = () =>
		isChat ? onChangeVariant('community') : onChangeVariant('chat')

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
