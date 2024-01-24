import { IconMemo } from '@/components/Icon'
import Image from 'next/image'
import { InfoModal } from './info-modal'
import { Pencil } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { getIsHost } from '@/lib/utils'

interface InfoCardProps {
	hostIdentity: string
	viewerIdentity: string
	name?: string
	thumbnailUrl?: Nullable<string>
}
export const InfoCard: React.FC<InfoCardProps> = ({
	hostIdentity,
	viewerIdentity,
	name,
	thumbnailUrl
}) => {
	const isHost = getIsHost(hostIdentity, viewerIdentity)
	if (!isHost) return <div className='text-xl font-semibold text-center'>Not allow</div>
	return (
		<div className='px-4 w-full mt-4'>
			<div className='rounded-xl bg-background'>
				<div className='flex items-center gap-x-2.5 p-4'>
					<div className='rounded-md bg-blue-600 p-2 h-auto w-auto'>
						<IconMemo IconView={Pencil} />
					</div>
					<div>
						<h2 className='text-sm lg:text-lg font-semibold capitalize'>
							Edit your stream info
						</h2>
						<p className='text-muted-foreground text-xs lg:text-sm'>
							Maximize your visibility
						</p>
					</div>
					<InfoModal
						initialName={name}
						initialThumbnailUrl={thumbnailUrl}
					/>
				</div>
				<Separator />
				<div className='p-4 lg:p-6 space-y-4'>
					<div>
						<h3 className='text-sm text-muted-foreground mb-2'>
							Name
						</h3>
						<p className='text-sm font-semibold'>{name}</p>
					</div>
					<div>
						<h3 className='text-sm text-muted-foreground mb-2'>
							Thumbnail
						</h3>
						{thumbnailUrl && (
							<div
								className={`relative aspect-video rounded-md 
							overflow-hidden h-52 w-auto border border-white/10`}
							>
								<Image
									fill
									src={thumbnailUrl}
									alt={name || ''}
									className='object-cover'
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
