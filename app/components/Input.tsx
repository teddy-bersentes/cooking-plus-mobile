import React, { Ref, forwardRef } from "react";
import { TextInput } from "react-native";
import { styled } from "nativewind";
import clsx from "clsx";

export const _Input = styled(TextInput, {
	props: {
		placeholderTextColor: "color",
	}
});


type Props = React.ComponentProps<typeof _Input> & {
	fontSize?: number
}

export const Input = forwardRef(function TextField({ className, tw, fontSize, placeholderTextColor, ...props }: Props, ref: Ref<TextInput>) {
	return (
		<_Input
			ref={ref}
			tw={clsx('text-off-black', className, tw)}
			placeholderTextColor={placeholderTextColor}
			style={[{ fontSize: fontSize || 16 }, props.style]}
			{...props}
		/>
	)
})