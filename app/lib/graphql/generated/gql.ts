/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tfragment UserModel on User {\n\t\tid\n\t\tname\n\t\tphoneNumber\n\t\tdietaryRestrictions\n\t\tcreatedAt\n\t}\n": types.UserModelFragmentDoc,
    "\n\tfragment RecipeModel on Recipe {\n\t\tid\n\t\tname\n\t\ttags\n\t\timageUrl\n\t\tpreparationTime\n\t\tinstructions\n\t\tingredients\n\t\tcreatedAt\n\t}\n": types.RecipeModelFragmentDoc,
    "\n\tquery Recipes {\n\t\trecipes {\n\t\t\t...RecipeModel\n\t\t}\n\t}\n": types.RecipesDocument,
    "\n\tfragment OrderModel on Order {\n\t\tid\n\t\tcreatedAt\n\t\tmealType\n\t\torderStatus\n\t\thasViewerVoted\n\t\tvoteCount\n\t\tvoters {\n\t\t\t...UserModel\n\t\t}\n\t\tchefs {\n\t\t\t...UserModel\n\t\t}\n\t\tchefCount\n\t\trecipe {\n\t\t\t...RecipeModel\n\t\t}\n\t}\n": types.OrderModelFragmentDoc,
    "\n\tquery Orders($beforeDate: DateTime, $afterDate: DateTime) {\n\t\torders(beforeDate: $beforeDate, afterDate: $afterDate) {\n\t\t\t...OrderModel\n\t\t}\n\t}\n": types.OrdersDocument,
    "\n\tmutation CreateOrder($recipeId: String!, $isCooking: Boolean, $isVoting: Boolean, $mealType: MealType!) {\n\t\tcreateOrder(recipeId: $recipeId, isCooking: $isCooking, isVoting: $isVoting, mealType: $mealType) {\n\t\t\t...OrderModel\n\t\t}\n\t}\n": types.CreateOrderDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment UserModel on User {\n\t\tid\n\t\tname\n\t\tphoneNumber\n\t\tdietaryRestrictions\n\t\tcreatedAt\n\t}\n"): (typeof documents)["\n\tfragment UserModel on User {\n\t\tid\n\t\tname\n\t\tphoneNumber\n\t\tdietaryRestrictions\n\t\tcreatedAt\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment RecipeModel on Recipe {\n\t\tid\n\t\tname\n\t\ttags\n\t\timageUrl\n\t\tpreparationTime\n\t\tinstructions\n\t\tingredients\n\t\tcreatedAt\n\t}\n"): (typeof documents)["\n\tfragment RecipeModel on Recipe {\n\t\tid\n\t\tname\n\t\ttags\n\t\timageUrl\n\t\tpreparationTime\n\t\tinstructions\n\t\tingredients\n\t\tcreatedAt\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Recipes {\n\t\trecipes {\n\t\t\t...RecipeModel\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Recipes {\n\t\trecipes {\n\t\t\t...RecipeModel\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment OrderModel on Order {\n\t\tid\n\t\tcreatedAt\n\t\tmealType\n\t\torderStatus\n\t\thasViewerVoted\n\t\tvoteCount\n\t\tvoters {\n\t\t\t...UserModel\n\t\t}\n\t\tchefs {\n\t\t\t...UserModel\n\t\t}\n\t\tchefCount\n\t\trecipe {\n\t\t\t...RecipeModel\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment OrderModel on Order {\n\t\tid\n\t\tcreatedAt\n\t\tmealType\n\t\torderStatus\n\t\thasViewerVoted\n\t\tvoteCount\n\t\tvoters {\n\t\t\t...UserModel\n\t\t}\n\t\tchefs {\n\t\t\t...UserModel\n\t\t}\n\t\tchefCount\n\t\trecipe {\n\t\t\t...RecipeModel\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Orders($beforeDate: DateTime, $afterDate: DateTime) {\n\t\torders(beforeDate: $beforeDate, afterDate: $afterDate) {\n\t\t\t...OrderModel\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Orders($beforeDate: DateTime, $afterDate: DateTime) {\n\t\torders(beforeDate: $beforeDate, afterDate: $afterDate) {\n\t\t\t...OrderModel\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateOrder($recipeId: String!, $isCooking: Boolean, $isVoting: Boolean, $mealType: MealType!) {\n\t\tcreateOrder(recipeId: $recipeId, isCooking: $isCooking, isVoting: $isVoting, mealType: $mealType) {\n\t\t\t...OrderModel\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateOrder($recipeId: String!, $isCooking: Boolean, $isVoting: Boolean, $mealType: MealType!) {\n\t\tcreateOrder(recipeId: $recipeId, isCooking: $isCooking, isVoting: $isVoting, mealType: $mealType) {\n\t\t\t...OrderModel\n\t\t}\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;