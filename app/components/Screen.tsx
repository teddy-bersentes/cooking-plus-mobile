import React from "react";
import { View as RNView, StatusBar } from "react-native";
import { styled } from "nativewind"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements';
import clsx from "clsx";

const View = styled(RNView)
type Props = React.ComponentProps<typeof View>

export function Screen({ className, tw, children, ...props }: Props) {
	const headerHeight = useHeaderHeight();
	const insets = useSafeAreaInsets();

	return (
		<View
			tw={clsx('h-full bg-white items-center justify-center', className, tw)}
			style={[{ paddingTop: headerHeight + insets.top, paddingBottom: insets.bottom, }, props.style]}
			{...props}
		>
			<StatusBar backgroundColor={'#FFFFFF'} barStyle='dark-content' />
			{children}
		</View>
	)
}
