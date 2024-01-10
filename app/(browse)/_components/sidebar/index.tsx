import { Following, FollowingSkeleton } from './following'
import { Recommended, RecommendedSkeleton } from './recommended'
import { Toggle, ToggleSkeleton } from './toggle'

import { Wrapper } from './wrapper'
import { followService } from '@/lib/follow-service'
import { getRecommended } from '@/lib/recommended-service'

export default async function SideBar() {
	const recommended = await getRecommended()
	const following = await followService.getFollowedUser()
	return (
		<Wrapper>
			<Toggle />
			<Following data={following} />
			<Recommended data={recommended} />
		</Wrapper>
	)
}
export const SidebarSkeleton = () => (
	<aside
		className={`fixed left-0 flex flex-col w-20 lg:w-60 h-full
		 bg-background border-r border-[#2D2E35] z-50`}
	>
		<ToggleSkeleton />
		<FollowingSkeleton />
		<RecommendedSkeleton />
	</aside>
)
