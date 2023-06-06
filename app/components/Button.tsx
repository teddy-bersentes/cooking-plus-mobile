import React from "react"
import clsx from "clsx"
import { styled } from "nativewind"
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native"

const buttonVariants = {
	default: 'flex justify-center items-center',
	primary: 'bg-system-blue rounded-[14px] w-full py-[14px] px-5',
	secondary: 'bg-[#007AFF26] rounded-[14px] w-full py-[14px] px-5'
}

const _Button = styled(TouchableOpacity)

type Props = {
	variant?: Exclude<keyof typeof buttonVariants, 'default'>
} & React.ComponentProps<typeof _Button>

export function Button({ tw, variant, ...props }: Props) {
	return <_Button
		tw={clsx(
			buttonVariants.default,
			variant && buttonVariants[variant],
			tw,
			props.disabled && 'opacity-60'
		)}
		{...props}
	/>
}

export const Tappable = styled(TouchableWithoutFeedback)
export const TappableOpacity = styled(TouchableOpacity)
