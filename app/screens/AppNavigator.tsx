import React from "react"
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp, createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import * as Screen from '.'
import { useAuthStore } from "~/lib/store/auth"
import { OrderModelFragment, RecipeModelFragment } from "~/lib/graphql"

export type StackList = {
	Landing: undefined
	PhoneNumber: undefined
	Code: { phoneNumber: string }
	Main: NavigatorScreenParams<Screen.MainTabParamList>
	RecipeDetail: { recipe: RecipeModelFragment; order?: OrderModelFragment }
	ImportRecipe: undefined
}


export type AppStackScreenProps<T extends keyof StackList> = NativeStackScreenProps<StackList, T>

export const useStackNavigation = () => useNavigation<NativeStackNavigationProp<StackList>>()

const Stack = createNativeStackNavigator<StackList>()

function AppStack() {
	const hasAuthToken = useAuthStore(state => state.user !== null)

	return (
		<Stack.Navigator>
			{hasAuthToken ? (
				<>
					<Stack.Screen name='Main' component={Screen.MainNavigator} options={{ headerShown: false }} />
					<Stack.Screen name='RecipeDetail' component={Screen.RecipeDetailScreen} options={{ headerShown: false }} />
					<Stack.Screen name='ImportRecipe' component={Screen.ImportRecipeScreen} options={{ headerShown: false }} />
				</>
			) : (
				<>
					<Stack.Screen name='Landing' component={Screen.LandingScreen} options={{ headerShown: false }} />
					<Stack.Screen name='PhoneNumber' component={Screen.PhoneNumberScreen} />
					<Stack.Screen name='Code' component={Screen.CodeScreen} />
				</>
			)}

		</Stack.Navigator>
	)
}

export function AppNavigator() {
	return <AppStack />
}