import React from "react";
import { useOrderStore } from "~/lib/store/order";
import { Toggle, View, Text } from "~/components"
import clsx from "clsx";

type Props = {
	orderId?: string
	step: number
	text: string
}

export function InstructionStep({ orderId, step, text }: Props) {
	const value = useOrderStore(state => state.toggles[orderId || '']?.[step] || false)
	const toggleStep = useOrderStore(state => state.toggleStep)

	return (
		<View tw='flex flex-row mb-6'>
			{orderId && (
				<Toggle
					value={value}
					onChange={() => toggleStep({ orderId, step })}
				/>
			)}
			<View tw={clsx('flex flex-col', orderId && 'pl-2 pr-5')}>
				<Text tw='font-pro-display-semibold leading-6 text-base mb-1'>Step {step}</Text>
				<Text tw='font-pro-text leading-6 tracking-[-0.38px] text-base'>{text}</Text>
			</View>
		</View>
	)
}