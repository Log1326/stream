import { create } from 'zustand'

interface ICreatorSidebar {
	isCollapsed: boolean
	onExpand: () => void
	onCollapsed: () => void
}
export const useCreatorSidebar = create<ICreatorSidebar>(set => ({
	isCollapsed: false,
	onExpand: () => set(() => ({ isCollapsed: false })),
	onCollapsed: () => set(() => ({ isCollapsed: true }))
}))
