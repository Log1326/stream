'use client'

import { Search as SearchIcon, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { IconMemo } from '@/components/Icon'
import { Input } from '@/components/ui/input'
import qs from 'query-string'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Search = () => {
	const router = useRouter()
	const [value, setValue] = useState<string>('')
	const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		if (!value) return
		const url = qs.stringifyUrl(
			{
				url: '/search',
				query: { term: value }
			},
			{ skipEmptyString: true }
		)
		router.push(url)
	}
	const onChangeHandle = (ev: React.ChangeEvent<HTMLInputElement>) =>
		setValue(ev.target.value)
	const onClear = () => setValue('')
	return (
		<form
			onSubmit={onSubmit}
			className='relative w-full lg:w-[400px] flex items-center'
		>
			<Input
				value={value}
				onChange={onChangeHandle}
				placeholder='Search'
				className='rounded-r-none focus-visible:ring-0 rounded-lg pl-4 pr-10 
            focus-visible:ring-transparent focus-visible:ring-offset-0'
			/>
			{value && (
				<IconMemo
					onClick={onClear}
					size='lg'
					className='absolute right-10 top-0'
					IconView={X}
				/>
			)}
			<Button
				type='submit'
				size='sm'
				variant='secondary'
				className='rounded-l-none'
			>
				<IconMemo IconView={SearchIcon} />
			</Button>
		</form>
	)
}
