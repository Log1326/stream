import { create } from 'zustand'

interface SidebarStore {
	isCollapsed: boolean
	onExpand: () => void
	onCollapsed: () => void
}

export const useSidebar = create<SidebarStore>(set => ({
	isCollapsed: false,
	onExpand: () => set(() => ({ isCollapsed: false })),
	onCollapsed: () => set(() => ({ isCollapsed: true }))
}))
