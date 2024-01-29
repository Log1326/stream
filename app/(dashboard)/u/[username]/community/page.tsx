import { DataTable } from './_components/data-table'
import { blockService } from '@/lib/block-service'
import { columns } from './_components/columns'
import { format } from 'date-fns'

export default async function PageCommunity() {
	const data = await blockService.getBlockedAllUsers()
	const formattedData = data.map(block => ({
		...block,
		userId: block.blocked.id,
		image: block.blocked.imageUrl,
		username: block.blocked.username,
		createdAt: format(new Date(block.blocked.createdAt), 'dd/MM/yyyy')
	}))
	return (
		<div className='p-6'>
			<div className='font-semibold text-2xl'>Community Settings</div>
			<DataTable columns={columns} data={formattedData} />
		</div>
	)
}
