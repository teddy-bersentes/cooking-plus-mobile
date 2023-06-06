import React from "react";
import { OrderModelFragment, OrderStatus, defrag, recipeModel, userModel } from "~/lib/graphql";
import { View, Text, Image, Button } from "~/components";
import { useStackNavigation } from "~/screens";
import { UserAvatar } from "./UserAvatar";
import clsx from "clsx";

type Props = {
	order: OrderModelFragment;
}

export function OrderCard({ order }: Props) {
	const navigation = useStackNavigation()
	const recipe = defrag(recipeModel, order.recipe)

	return (
		<Button
			activeOpacity={0.70}
			onPress={() => navigation.navigate('RecipeDetail', { recipe, order })}
		>
			<View tw='w-full flex flex-col'>
				<View tw='w-full h-52 relative'>
					<Image
						tw='w-full h-full rounded-xl'
						source={{ uri: recipe.imageUrl }}
					/>

					<View tw='absolute bottom-2 left-3 py-1 pl-1 pr-3 bg-white rounded-full flex flex-row items-center'>
						{order.orderStatus === OrderStatus.Cooking && (
							<>
								{order.chefs.map((chef, index) => (
									<UserAvatar
										key={defrag(userModel, chef).id}
										tw={clsx(index > 0 && 'ml-[-10px]')}
										user={defrag(userModel, chef)}
										size={32}
									/>
								))}

								<Text tw='ml-1'>
									{order.chefCount} cooking now
								</Text>
							</>
						)}

						{order.orderStatus === OrderStatus.Voting && (
							<>
								{order.voters.map((chef, index) => (
									<UserAvatar
										key={defrag(userModel, chef).id}
										tw={clsx(index > 0 && 'ml-[-10px]')}
										user={defrag(userModel, chef)}
										size={32}
									/>
								))}

								<Text tw='ml-1.5'>
									{order.voteCount} votes
								</Text>
							</>
						)}
					</View>
				</View>

				<View tw='flex flex-col mt-2'>
					<Text tw='text-[17px] font-pro-display-semibold tracking-[0.38px] leading-[22px]'>{recipe.name}</Text>
					<Text tw='text-[13px] font-pro-text text-system-label-200 tracking-[-0.24px] mt-0.5'>
						{recipe.ingredients.length} ingredients • {recipe.preparationTime / 60} min
					</Text>
				</View>
			</View>
		</Button>
	)
}