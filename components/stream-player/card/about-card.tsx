import { BioModal } from '@/components/bio-modal'
import { VerifiedMark } from '@/components/verified-mark'
import { getIsHost } from '@/lib/utils'

interface AboutCardProps {
	hostName: string
	hostIdentity: string
	viewerIdentity: string
	bio: Nullable<string>
	followedByCount: number
}
export const AboutCard: React.FC<AboutCardProps> = ({
	bio,
	followedByCount,
	hostIdentity,
	hostName,
	viewerIdentity
}) => {
	const isHost = getIsHost(hostIdentity, viewerIdentity)
	const followedByLabel = followedByCount === 1 ? 'follower' : 'followers'
	return (
		<div className='px-4 w-full mt-4'>
			<div className='group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-2 font-semibold text-lg lg:text-2xl'>
						About {hostName}
						<VerifiedMark />
					</div>
					{isHost && <BioModal initialValue={bio} />}
				</div>
				<div className='text-sm text-muted-foreground'>
					<span className='font-semibold text-primary'>
						{followedByCount}
					</span>{' '}
					{followedByLabel}
				</div>
				<p className='text-sm'>
					{bio ||
						'This user prefers to keep an air of mystery about them'}
				</p>
			</div>
		</div>
	)
}
