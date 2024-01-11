import { Navigation } from './navigation'
import { Toggle } from './toggle'
import { Wrapper } from './wrapper'

export default function SidebarDashboard() {
	return (
		<Wrapper>
			<Toggle />
			<Navigation />
		</Wrapper>
	)
}
