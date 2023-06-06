import { useStackNavigation } from "~/screens";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { useEffect } from "react";

type Params = Partial<NativeStackNavigationOptions>

export const useHeader = (options: Params) => {
	const navigation = useStackNavigation();

	useEffect(() => {
		navigation.setOptions(options)
	}, [navigation, options])
}