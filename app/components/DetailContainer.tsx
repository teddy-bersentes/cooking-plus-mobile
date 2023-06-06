import React from "react";
import Animated, { Extrapolate, interpolate, interpolateColor, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, IconArrowLeft, MotionBlur, MotionImage, MotionText, View } from "~/components";
import { useStackNavigation } from "~/screens";
import { SCREEN } from "~/utils/constants";

const ScrollView = Animated.ScrollView

type Props = {
	children?: React.ReactNode
	imageUrl: string
	recipeName: string
}

export function DetailContainer({ children, imageUrl, recipeName }: Props) {
	const navigation = useStackNavigation()
	const scrollY = useSharedValue(0)
	const titleOpacity = useSharedValue(0)
	const safeArea = useSafeAreaInsets()

	const heroHeight = 46 + safeArea.top
	const fadeStart = SCREEN.width - heroHeight

	const onScroll = useAnimatedScrollHandler({
		onScroll: event => {
			scrollY.value = event.contentOffset.y
			titleOpacity.value = event.contentOffset.y > fadeStart ? 1 : 0
		}
	})

	const imageStyle = useAnimatedStyle(() => ({
		transform: [
			{ translateY: scrollY.value * 0.5 },
			{
				scale: interpolate(
					scrollY.value,
					[0, -SCREEN.width],
					[1, 2],
					Extrapolate.CLAMP
				)
			}
		],
		opacity: interpolate(
			scrollY.value,
			[fadeStart * 0.33, fadeStart],
			[1, 0.4],
			Extrapolate.CLAMP
		)
	}))

	const headerStyle = useAnimatedStyle(() => ({
		height: heroHeight,
		backgroundColor: interpolateColor(
			scrollY.value,
			[fadeStart - 40, fadeStart],
			['#FFFFFF00', '#f9f9f9F0']
		),
		borderBottomColor: interpolateColor(
			scrollY.value,
			[fadeStart - 40, fadeStart],
			['rgba(255,255,255,0)', '#3C3C4310']
		),
		opacity: interpolate(
			scrollY.value,
			[fadeStart - 40, fadeStart],
			[0, 1],
			Extrapolate.CLAMP
		),
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20
	}))

	const titleStyle = useAnimatedStyle(() => ({
		opacity: withSpring(
			titleOpacity.value,
			{ damping: 100, stiffness: 1000 }
		),
	}))

	return (
		<View tw='flex-1 relative bg-white'>
			<ScrollView onScroll={onScroll} scrollEventThrottle={16}>
				<MotionImage
					tw='w-full aspect-square rounded-t-2xl bg-white'
					source={{ uri: imageUrl }}
					contentFit='cover'
					style={imageStyle}
				/>
				{children}
			</ScrollView>

			<MotionBlur tint='light' tw='w-full absolute top-0 z-10 flex flex-row justify-center items-end border-b' style={headerStyle}>
				<MotionText tw='text-center text-[17px] font-semibold mb-3 leading-[22px]' style={titleStyle}>
					{recipeName}
				</MotionText>
			</MotionBlur>

			<Button tw='absolute top-1.5 left-4 z-20' onPress={navigation.goBack}>
				<View tw='bg-white rounded-full w-8 h-8 flex justify-center items-center' style={{ marginTop: safeArea.top }}>
					<IconArrowLeft width={14} height={14} tw='text-black mr-px mt-px' />
				</View>
			</Button>
		</View>
	)
}