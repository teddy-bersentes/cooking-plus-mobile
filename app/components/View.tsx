import { View as RNView } from "react-native";
import { styled } from "nativewind";
import Animated from "react-native-reanimated";
import React from "react";

const _View = styled(RNView)
export const View = React.forwardRef<RNView, React.ComponentProps<typeof _View>>(function View(props, ref) {
	return <_View {...props} ref={ref} />
})

export type ViewProps = React.ComponentProps<typeof View>

export const MotionView = styled(Animated.View)