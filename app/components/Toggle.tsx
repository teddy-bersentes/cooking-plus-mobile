import clsx from 'clsx'
import React, { useState } from 'react'
import { View, Svg, Path, Tappable } from '~/components'

type Props = {
	value: boolean
	onChange: (value: boolean) => void
}

export function Toggle({ value, onChange }: Props) {
	const onPress = () => onChange(!value)

	return (
		<Tappable onPress={onPress}>
			<View>
				<View tw={clsx('h-6 w-6 flex justify-center items-center rounded-full', value && 'bg-system-blue')}>
					{value ? (
						<Svg width="11" height="10" viewBox="0 0 11 10" fill="none">
							<Path d="M3.89988 9.84228C4.23095 9.84228 4.48907 9.71322 4.66863 9.44388L9.92084 1.31866C10.0555 1.11666 10.106 0.937093 10.106 0.763142C10.106 0.319846 9.78056 0 9.32604 0C9.01181 0 8.82102 0.112227 8.63024 0.415239L3.87743 7.94565L1.44211 4.85942C1.25694 4.62935 1.06615 4.52835 0.791198 4.52835C0.331069 4.52835 0 4.85381 0 5.30271C0 5.49911 0.0673361 5.68428 0.230065 5.88068L3.13674 9.46071C3.34997 9.72445 3.58564 9.84228 3.89988 9.84228Z" fill="white" />
						</Svg>
					) : (
						<View tw='border-[1.5px] w-full h-full rounded-xl border-[#3C3C434D]' />
					)}
				</View>
			</View>
		</Tappable>
	)
}