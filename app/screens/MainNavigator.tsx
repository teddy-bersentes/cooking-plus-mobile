import React from 'react';
import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackScreenProps } from '@react-navigation/stack'
import { StackList } from './AppNavigator';
import * as Screens from '~/screens'
import { CompositeScreenProps } from '@react-navigation/native';
import { IconFryingPan, IconGroup, IconMenu } from '~/components';

export type MainTabParamList = {
	Recipes: undefined;
	Orders: undefined;
	Family: undefined;
}

export type MainStackScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<MainTabParamList, T>,
	StackScreenProps<StackList>
>

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICON_MAP: Record<keyof MainTabParamList, React.FC<{ color: string; width: number; height: number }>> = {
	Recipes: IconMenu,
	Orders: IconFryingPan,
	Family: IconGroup
}

export function MainNavigator() {
	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => {
				if (route.name === 'Family') { size = size * 1.2 }
				return TAB_ICON_MAP[route.name]({ color, width: size, height: size })
			},
			headerShown: false
		})}>
			<Tab.Screen name='Recipes' component={Screens.RecipeListScreen} />
			<Tab.Screen name='Orders' component={Screens.OrderListScreen} />
			<Tab.Screen name='Family' component={Screens.FamilyScreen} />
		</Tab.Navigator>
	)
}