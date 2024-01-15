'use client'

import { CheckCheck, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { IconMemo } from '@/components/Icon'
import { useState } from 'react'

interface CopyButtonProps {
	value?: string | null
}
export const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
	const [isCopied, setIsCopied] = useState(false)
	const onCopy = () => {
		if (!value) return
		setIsCopied(true)
		navigator.clipboard.writeText(value)
		setTimeout(() => setIsCopied(false), 1200)
	}
	const Icon = isCopied ? CheckCheck : Copy
	return (
		<Button
			onClick={onCopy}
			disabled={!value || isCopied}
			variant='ghost'
			size='sm'
		>
			<IconMemo IconView={Icon} size='xs' />
		</Button>
	)
}
