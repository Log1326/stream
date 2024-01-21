import { create } from 'zustand'

type ChatVariant = 'chat' | 'community'

interface ChatSidebarStore {
	isCollapsed: boolean
	variant: ChatVariant
	onChangeVariant: (variant: ChatVariant) => void
	onExpand: () => void
	onCollapsed: () => void
}

export const useChatSidebar = create<ChatSidebarStore>(set => ({
	isCollapsed: false,
	variant: 'chat',
	onExpand: () => set(() => ({ isCollapsed: false })),
	onCollapsed: () => set(() => ({ isCollapsed: true })),
	onChangeVariant: variant => set(() => ({ variant }))
}))
