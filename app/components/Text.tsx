import React from "react"
import { Text as RNText } from "react-native"
import { styled } from "nativewind"
import clsx from "clsx"
import Animated from "react-native-reanimated"

const textVariants = {
	label: 'text-base tracking-[-0.41px] leading-[22px]',
	group: 'font-pro-text leading-[22px] tracking-[-0.41px] text-base text-system-label',
	'group-secondary': 'font-pro-text leading-[22px] tracking-[-0.41px] text-base text-system-label-placeholder',
	'group-title': 'text-system-label-placeholder text-[12px] leading-4 mb-2',
	'primary-button': 'text-white font-pro-text-semibold text-base tracking-[-0.41px] leading-[22px]',
	'secondary-button': 'text-system-blue font-pro-text-semibold text-base tracking-[-0.41px] leading-[22px]',
	'large-label': 'text-[34px] font-pro-display-bold leading-[41px] tracking-[0.37px]',
}

const StyledText = styled(RNText)

type Props = React.ComponentProps<typeof StyledText> & {
	variant?: Exclude<keyof typeof textVariants, 'default'>
}

export function Text({ className, tw, variant, ...props }: Props) {
	return (
		<StyledText
			style={props.style}
			tw={clsx(
				variant && textVariants[variant],
				tw,
				className,
			)}
			{...props}
		/>
	)
}

export const MotionText = Animated.createAnimatedComponent(StyledText)