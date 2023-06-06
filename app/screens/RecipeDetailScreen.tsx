import React from 'react'
import { Text, View, Button, Toggle, InstructionStep } from '~/components'
import { AppStackScreenProps } from './AppNavigator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateOrderMutationVariables, MealType, apiClient, createOrderDoc, defrag, orderModel } from '~/lib/graphql';
import { ActionSheetIOS, Alert } from 'react-native';
import { DetailContainer } from '~/components/DetailContainer';
import { useOrderStore } from '~/lib/store/order';
import { shallow } from 'zustand/shallow';
import clsx from 'clsx';

type Props = AppStackScreenProps<'RecipeDetail'>

export function RecipeDetailScreen({ navigation, route }: Props) {
	const recipe = route.params.recipe
	const order = route.params.order
	const toggleStep = useOrderStore(state => state.toggleStep)
	const stepValues = useOrderStore(state => state.toggles[recipe.id] || {}, shallow)

	const queryClient = useQueryClient()
	const orderMutation = useMutation({
		mutationFn: (args: CreateOrderMutationVariables) => apiClient.request(createOrderDoc, args),
		onSuccess: async (data, args) => {
			await queryClient.invalidateQueries(['orders'])
			if (args.isCooking) {
				const order = defrag(orderModel, data.createOrder)
				navigation.setParams({ order, recipe })
			}

			if (args.isVoting) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Main', params: { screen: 'Orders' } }]
				})
			}
		},
		onError: error => {
			console.log('error', error)
			Alert.alert('Error', 'Something went wrong. Please try again.')
		}
	})


	const promptMealType = async (): Promise<MealType | null> => {
		const mealTypeMap: Record<number, MealType> = {
			0: MealType.Breakfast,
			1: MealType.Lunch,
			2: MealType.Dinner
		}

		return await new Promise(resolve => {
			ActionSheetIOS.showActionSheetWithOptions({
				options: ['Breakfast', 'Lunch', 'Dinner', 'Cancel'],
				cancelButtonIndex: 3,
				title: 'Select meal type'
			}, (index) => {
				if (index >= 3) return resolve(null)
				return resolve(mealTypeMap[index] || null)
			})
		})
	}

	const onCookButtonPress = async () => {
		const mealType = await promptMealType()
		if (!mealType) return
		orderMutation.mutate({
			mealType,
			recipeId: recipe.id,
			isCooking: true
		})
	}

	const onVoteButtonPress = async () => {
		const mealType = await promptMealType()
		if (!mealType) return
		orderMutation.mutate({
			mealType,
			recipeId: recipe.id,
			isVoting: true
		})
	}

	return (
		<DetailContainer imageUrl={recipe.imageUrl} recipeName={recipe.name}>
			<View tw='flex flex-col w-full bg-white pt-4'>
				<View tw='w-full flex flex-col px-5'>
					<Text tw='text-[22px] tracking-[0.35px] font-pro-display-bold leading-7 mb-1.5'>{recipe.name}</Text>
					<Text tw='font-pro-text text-[15px] leading-5 tracking-[-0.24px] text-system-label-200'>
						{(recipe.preparationTime / 60).toFixed(0)} minutes • {recipe.ingredients.length} ingredients
					</Text>
				</View>

				<View tw='w-full h-px bg-[#EBEBEB] my-4' />

				<View tw='w-full flex flex-col px-5'>
					<Text tw='font-pro-display-semibold text-[18px] leading-5 mb-4'>Ingredients</Text>
					{recipe.ingredients.map((ingredient, index) => (
						<View key={index} tw='flex flex-row items-center mb-4'>
							<View tw='w-6 h-6 rounded-full bg-[#F2F2F7] flex justify-center items-center mr-2'>
								<Text tw='text-[12px] font-pro-display-bold text-black'>
									{index + 1}
								</Text>
							</View>

							<Text>{ingredient}</Text>
						</View>
					))}
				</View>

				<View tw='w-full h-px bg-[#EBEBEB] mb-4 mt-1' />

				<View tw='w-full flex flex-col px-5'>
					<Text tw='font-pro-display-semibold text-[18px] leading-5 mb-6'>Instructions</Text>
					{recipe.instructions.map((instruction, index) => (
						<InstructionStep
							key={index}
							step={index + 1}
							text={instruction}
							orderId={order?.id}
						/>
						// <View key={index} tw='flex flex-row mb-6'>
						// 	{order && <Toggle
						// 		value={stepValues[index] || false}
						// 		onChange={() => toggleStep({
						// 			orderId: order.id,
						// 			step: index
						// 		})}
						// 	/>}
						// 	<View tw={clsx('flex flex-col', order && 'pl-2 pr-5')}>
						// 		<Text tw='font-pro-display-semibold leading-6 text-base mb-1'>Step {index + 1}</Text>
						// 		<Text tw='font-pro-text leading-6 tracking-[-0.38px] text-base'>
						// 			{instruction}
						// 		</Text>
						// 	</View>
						// </View>
					))}

					{!order && (
						<>
							<Button variant='primary' tw='mt-8' onPress={onCookButtonPress} disabled={orderMutation.isLoading}>
								<Text variant='primary-button'>
									Start cooking
								</Text>
							</Button>

							<Button variant='secondary' tw='mt-3' onPress={onVoteButtonPress} disabled={orderMutation.isLoading}>
								<Text variant='secondary-button'>
									Vote for recipe
								</Text>
							</Button>
						</>
					)}
				</View>

				<View tw='h-20' />
			</View>
		</DetailContainer>
	)
}