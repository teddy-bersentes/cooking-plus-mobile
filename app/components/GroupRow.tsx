import React from 'react'
import { Text, View } from '~/components'
import clsx from 'clsx'

type Props = React.ComponentProps<typeof View> & ({
	type: 'top'
	title?: string
} | {
	type?: undefined
} | {
	type: 'bottom'
	description?: string
})

export function GroupRow({ type, tw, children, ...props }: Props) {
	return (
		<View tw={clsx(
			'bg-white h-11 flex flex-row items-center px-4 relative justify-between',
			type === 'top' && 'rounded-t-[10px]',
			type === 'bottom' && 'rounded-b-[10px]',
			tw
		)} {...props}>
			{children}
			{type !== 'bottom' && <View tw='absolute bottom-0 w-full bg-system-divider h-[0.5px] items-self-center ml-4' />}
		</View>
	)
}