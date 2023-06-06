import "./utils/ignoreWarnings"
import React, { useEffect } from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { AppNavigator } from "./screens"
import { NavigationContainer } from "@react-navigation/native"
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useAppStateRefresh } from "./utils/reactQuery"
import { queryClient, persister } from "./lib/graphql"
import { useFonts } from "expo-font"
import fonts from "./utils/fonts"
import { ModalProvider } from "./lib/modals"

function App({ hideSplashScreen }: { hideSplashScreen: () => Promise<void> }) {
	const [fontsLoaded] = useFonts(fonts)

	useEffect(() => {
		if (fontsLoaded) {
			hideSplashScreen()
		}
	}, [fontsLoaded, hideSplashScreen])

	useAppStateRefresh()

	if (!fontsLoaded) return null

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<NavigationContainer>
				<PersistQueryClientProvider client={queryClient} persistOptions={{ persister, maxAge: Infinity }}>
					<ModalProvider>
						<AppNavigator />
					</ModalProvider>
				</PersistQueryClientProvider>
			</NavigationContainer>
		</SafeAreaProvider>
	)
}

export default App
