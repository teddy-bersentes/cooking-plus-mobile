import React, { useMemo } from "react";
import { Gradient, Text, View } from "~/components"
import { UserModelFragment } from "~/lib/graphql";
import { djb2 } from "~/utils/djb2";
import { abbreviate } from "~/utils/abbreviate";
import { ViewStyle } from "react-native";

type GradientType = 'pink' | 'red' | 'orange' | 'gray' | 'yellow' | 'green' | 'blue' | 'purple'

const GRADIENT_MAP: Record<GradientType, string[]> = {
	red: ['#FF8B82', '#FE7294'],
	pink: ['#FE9FB3', '#FE7294'],
	orange: ['#FEBC76', '#FEA030'],
	yellow: ['#FED877', '#FDC836'],
	green: ['#95E69F', '#64DC75'],
	blue: ['#9BDBFA', '#6DCCF8'],
	purple: ['#BEACF9', '#A389F6'],
	gray: ['#B7B7BB', '#98989D']
}

type Props = {
	user: UserModelFragment;
	size?: number
	fontSize?: number
	tw?: string
	style?: ViewStyle
}

export function UserAvatar({ user, size, fontSize, style }: Props) {
	const gradientType: GradientType = useMemo(() => {
		const index = djb2(user.id) % Object.keys(GRADIENT_MAP).length
		return Object.keys(GRADIENT_MAP)[index] as GradientType;
	}, [user.id])

	return (
		<View
			tw='rounded-full flex justify-center items-center relative'
			style={[{ width: size, height: size }, style]}
		>
			<Gradient
				tw='w-full h-full rounded-full absolute'
				colors={GRADIENT_MAP[gradientType]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			/>

			<Text tw='font-pro-rounded text-white' style={{ fontSize }}>
				{abbreviate(user.name)}
			</Text>
		</View>
	)
}
