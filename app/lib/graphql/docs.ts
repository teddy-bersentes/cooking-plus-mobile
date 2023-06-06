import { graphql } from './generated/gql';

export const userModel = graphql(`
	fragment UserModel on User {
		id
		name
		phoneNumber
		dietaryRestrictions
		createdAt
	}
`)

export const recipeModel = graphql(`
	fragment RecipeModel on Recipe {
		id
		name
		tags
		imageUrl
		preparationTime
		instructions
		ingredients
		createdAt
	}
`)

export const recipeDoc = graphql(`
	query Recipes {
		recipes {
			...RecipeModel
		}
	}
`)

export const orderModel = graphql(`
	fragment OrderModel on Order {
		id
		createdAt
		mealType
		orderStatus
		hasViewerVoted
		voteCount
		voters {
			...UserModel
		}
		chefs {
			...UserModel
		}
		chefCount
		recipe {
			...RecipeModel
		}
	}
`)

export const ordersDoc = graphql(`
	query Orders($beforeDate: DateTime, $afterDate: DateTime) {
		orders(beforeDate: $beforeDate, afterDate: $afterDate) {
			...OrderModel
		}
	}
`)

export const createOrderDoc = graphql(`
	mutation CreateOrder($recipeId: String!, $isCooking: Boolean, $isVoting: Boolean, $mealType: MealType!) {
		createOrder(recipeId: $recipeId, isCooking: $isCooking, isVoting: $isVoting, mealType: $mealType) {
			...OrderModel
		}
	}
`)