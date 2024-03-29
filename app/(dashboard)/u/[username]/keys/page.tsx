import { ConnectModal } from './_components/connect-modal'
import { KeyCard } from './_components/key-card'
import { UrlCard } from './_components/url-card'
import { authService } from '@/lib/auth-service'
import { streamService } from '@/lib/stream-service'

export default async function PageKeys() {
	const userAuth = await authService.getAuth()
	const stream = await streamService.getStreamByUserId(userAuth.id)
	return (
		<div className='p-6'>
			<div className='flex justify-around items-center mb-10'>
				<h1 className='text-2xl font-bold'>Keys & URLs</h1>
				<ConnectModal />
			</div>
			<div className='space-y-4'>
				<UrlCard value={stream?.serverUrl} />
				<KeyCard value={stream?.streamKey} />
			</div>
		</div>
	)
}
