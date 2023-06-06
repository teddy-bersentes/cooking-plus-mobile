import React from "react"
import { RecipeModelFragment } from "~/lib/graphql"
import { View, Image, Text, TappableOpacity, MotionView, Gradient } from '~/components'
import { SCREEN } from "~/utils/constants"
import { useStackNavigation } from "~/screens"

export const RECIPE_CARD_HEIGHT = 192 // 40 * 4

type Props = {
	recipe: RecipeModelFragment
}

export function RecipeCard({ recipe }: Props) {
	const navigation = useStackNavigation()

	const onPress = () => {
		navigation.navigate('RecipeDetail', { recipe })
	}

	return (
		<TappableOpacity onPress={onPress}>
			<MotionView tw='h-48 flex flex-col justify-end items-start w-full relative rounded-xl'>
				<Image
					tw='rounded-xl absolute h-full w-full'
					source={{ uri: recipe.imageUrl, width: SCREEN.width - 40 }}
				/>
				<Gradient
					tw='h-[86px] w-full justify-self-end absolute bottom-0 rounded-b-xl'
					colors={[
						'#16252900',
						'#251714'
					]}
				/>
				<View tw='flex flex-col px-4 pb-3'>
					<Text tw='text-white font-bold text-xl'>{recipe.name}</Text>
					<Text tw='text-white'>{(recipe.preparationTime / 60).toFixed(0)} minutes</Text>
				</View>
			</MotionView>
		</TappableOpacity>
	)
}

