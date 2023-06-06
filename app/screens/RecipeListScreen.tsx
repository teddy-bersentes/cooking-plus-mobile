import React from 'react';
import { MainStackScreenProps } from '.';
import { Text, View, RecipeCard, RECIPE_CARD_HEIGHT, Button } from '~/components';
import { FlatListWithHeaders, Header, LargeHeader, ScalingView } from '@codeherence/react-native-header'
import { apiClient, recipeDoc, defrag, recipeModel } from '~/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { ActionSheetIOS } from 'react-native';

type Props = MainStackScreenProps<'Recipes'>

export function RecipeListScreen({ navigation }: Props) {
	const recipesQuery = useQuery({
		queryKey: ['recipes'],
		queryFn: () => apiClient.request(recipeDoc),
		select: data => data.recipes.map(recipe => defrag(recipeModel, recipe))
	})

	const onAddRecipe = () => {
		ActionSheetIOS.showActionSheetWithOptions(
			{
				options: ['Cancel', 'Import from URL'],
				cancelButtonIndex: 0
			},
			index => {
				if (index === 1) {
					navigation.navigate('ImportRecipe')
				}
			}
		)
	}

	return (
		<FlatListWithHeaders
			LargeHeaderComponent={({ scrollY }) => (
				<LargeHeader headerStyle={{ paddingHorizontal: 0, marginBottom: 24, alignItems: 'center' }}>
					<ScalingView scrollY={scrollY}>
						<Text tw='text-[34px] font-pro-display-bold leading-[41px] tracking-[0.37px]'>
							Recipes
						</Text>
					</ScalingView>

					<Button>
						<Text tw='text-system-blue' onPress={onAddRecipe}>
							+ Add recipe
						</Text>
					</Button>
				</LargeHeader>
			)}
			HeaderComponent={({ showNavBar }) => (
				<Header
					showNavBar={showNavBar}
					headerCenter={
						<Text tw='font-pro-text-semibold text-[17px] leading-[22px] tracking-[-0.41px]'>
							Recipes
						</Text>
					}
				/>
			)}
			data={recipesQuery.data}
			ItemSeparatorComponent={() => <View tw='h-8' />}
			ListFooterComponent={() => <View tw='h-8' />}
			renderItem={({ item }) => <RecipeCard key={item.id} recipe={item} />}
			style={{ height: '100%', width: '100%', paddingHorizontal: 20 }}
			getItemLayout={(_, index) => ({
				index,
				length: RECIPE_CARD_HEIGHT,
				offset: RECIPE_CARD_HEIGHT * index
			})}
		/>
	)
}
