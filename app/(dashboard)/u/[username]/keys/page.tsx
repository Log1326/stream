import { ConnectModal } from './_components/connect-modal'
import { KeyCard } from './_components/key-card'
import { UrlCard } from './_components/url-card'
import { getAuth } from '@/lib/auth-service'
import { streamService } from '@/lib/stream-service'

export default async function PageKeys() {
	const userAuth = await getAuth()
	const stream = await streamService.getStreamByUserId(userAuth.id)
	return (
		<>
			<div className='flex justify-around items-center mb-4'>
				<h1 className='text-2xl font-bold'>Keys & URLs</h1>
				<ConnectModal />
			</div>
			<div className='space-y-4'>
				<UrlCard value={stream?.serverUrl} />
				<KeyCard value={stream?.streamKey} />
			</div>
		</>
	)
}
