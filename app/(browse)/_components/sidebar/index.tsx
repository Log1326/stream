import { Recommended, RecommendedSkeleton } from './recommended'
import { Toggle, ToggleSkeleton } from './toggle'

import { Wrapper } from './wrapper'
import { getRecommended } from '@/lib/recommended-service'

export default async function SideBar() {
	const data = await getRecommended()
	return (
		<Wrapper>
			<Toggle />
			<Recommended data={data} />
		</Wrapper>
	)
}
export const SidebarSkeleton = () => (
	<aside
		className={`fixed left-0 flex flex-col w-20 lg:w-60 h-full
		 bg-background border-r border-[#2D2E35] z-50`}
	>
		<ToggleSkeleton />
		<RecommendedSkeleton />
	</aside>
)
