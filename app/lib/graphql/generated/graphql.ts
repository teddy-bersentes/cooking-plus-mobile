/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
};

export type CreateUserInput = {
  dietaryRestrictions?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type Family = {
  __typename?: 'Family';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  members: Array<User>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum MealType {
  Breakfast = 'breakfast',
  Dinner = 'dinner',
  Lunch = 'lunch'
}

export type Mutation = {
  __typename?: 'Mutation';
  cookForOrder: Order;
  createFamily: Family;
  createOrder: Order;
  createRecipeFromAi: Recipe;
  createRecipeFromUrl: Recipe;
  joinFamily: Family;
  voteForOrder: Order;
};


export type MutationCookForOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationCreateFamilyArgs = {
  name: Scalars['String'];
  user: CreateUserInput;
};


export type MutationCreateOrderArgs = {
  isCooking?: InputMaybe<Scalars['Boolean']>;
  isVoting?: InputMaybe<Scalars['Boolean']>;
  mealType?: InputMaybe<MealType>;
  recipeId: Scalars['String'];
};


export type MutationCreateRecipeFromAiArgs = {
  name: Scalars['String'];
};


export type MutationCreateRecipeFromUrlArgs = {
  url: Scalars['String'];
};


export type MutationJoinFamilyArgs = {
  familyId: Scalars['String'];
  user: CreateUserInput;
};


export type MutationVoteForOrderArgs = {
  orderId: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  chefCount: Scalars['Int'];
  chefs: Array<User>;
  createdAt: Scalars['DateTime'];
  family: Family;
  hasViewerVoted: Scalars['Boolean'];
  id: Scalars['ID'];
  isViewerCooking: Scalars['Boolean'];
  mealType: MealType;
  orderStatus: OrderStatus;
  recipe: Recipe;
  updatedAt: Scalars['DateTime'];
  voteCount: Scalars['Int'];
  voters: Array<User>;
};

export enum OrderStatus {
  Completed = 'completed',
  Cooking = 'cooking',
  Voting = 'voting'
}

export type Query = {
  __typename?: 'Query';
  orders: Array<Order>;
  recipes: Array<Recipe>;
};


export type QueryOrdersArgs = {
  afterDate?: InputMaybe<Scalars['DateTime']>;
  beforeDate?: InputMaybe<Scalars['DateTime']>;
};

export type Recipe = {
  __typename?: 'Recipe';
  createdAt: Scalars['DateTime'];
  family: Family;
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  ingredients: Array<Scalars['String']>;
  instructions: Array<Scalars['String']>;
  name: Scalars['String'];
  preparationTime: Scalars['Int'];
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  dietaryRestrictions: Array<Scalars['String']>;
  family: Family;
  id: Scalars['ID'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserModelFragment = { __typename?: 'User', id: string, name: string, phoneNumber: string, dietaryRestrictions: Array<string>, createdAt: string } & { ' $fragmentName'?: 'UserModelFragment' };

export type RecipeModelFragment = { __typename?: 'Recipe', id: string, name: string, tags: Array<string>, imageUrl: string, preparationTime: number, instructions: Array<string>, ingredients: Array<string>, createdAt: string } & { ' $fragmentName'?: 'RecipeModelFragment' };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<(
    { __typename?: 'Recipe' }
    & { ' $fragmentRefs'?: { 'RecipeModelFragment': RecipeModelFragment } }
  )> };

export type OrderModelFragment = { __typename?: 'Order', id: string, createdAt: string, mealType: MealType, orderStatus: OrderStatus, hasViewerVoted: boolean, voteCount: number, chefCount: number, voters: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserModelFragment': UserModelFragment } }
  )>, chefs: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserModelFragment': UserModelFragment } }
  )>, recipe: (
    { __typename?: 'Recipe' }
    & { ' $fragmentRefs'?: { 'RecipeModelFragment': RecipeModelFragment } }
  ) } & { ' $fragmentName'?: 'OrderModelFragment' };

export type OrdersQueryVariables = Exact<{
  beforeDate?: InputMaybe<Scalars['DateTime']>;
  afterDate?: InputMaybe<Scalars['DateTime']>;
}>;


export type OrdersQuery = { __typename?: 'Query', orders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderModelFragment': OrderModelFragment } }
  )> };

export type CreateOrderMutationVariables = Exact<{
  recipeId: Scalars['String'];
  isCooking?: InputMaybe<Scalars['Boolean']>;
  isVoting?: InputMaybe<Scalars['Boolean']>;
  mealType: MealType;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderModelFragment': OrderModelFragment } }
  ) };

export const UserModelFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<UserModelFragment, unknown>;
export const RecipeModelFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<RecipeModelFragment, unknown>;
export const OrderModelFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"mealType"}},{"kind":"Field","name":{"kind":"Name","value":"orderStatus"}},{"kind":"Field","name":{"kind":"Name","value":"hasViewerVoted"}},{"kind":"Field","name":{"kind":"Name","value":"voteCount"}},{"kind":"Field","name":{"kind":"Name","value":"voters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserModel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chefs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserModel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chefCount"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeModel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<OrderModelFragment, unknown>;
export const RecipesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recipes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeModel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<RecipesQuery, RecipesQueryVariables>;
export const OrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Orders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beforeDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"afterDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"beforeDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beforeDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"afterDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"afterDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderModel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"mealType"}},{"kind":"Field","name":{"kind":"Name","value":"orderStatus"}},{"kind":"Field","name":{"kind":"Name","value":"hasViewerVoted"}},{"kind":"Field","name":{"kind":"Name","value":"voteCount"}},{"kind":"Field","name":{"kind":"Name","value":"voters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserModel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chefs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserModel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chefCount"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeModel"}}]}}]}}]} as unknown as DocumentNode<OrdersQuery, OrdersQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isCooking"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVoting"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mealType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MealType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"recipeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recipeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isCooking"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isCooking"}}},{"kind":"Argument","name":{"kind":"Name","value":"isVoting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVoting"}}},{"kind":"Argument","name":{"kind":"Name","value":"mealType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mealType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderModel"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"dietaryRestrictions"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RecipeModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Recipe"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"preparationTime"}},{"kind":"Field","name":{"kind":"Name","value":"instructions"}},{"kind":"Field","name":{"kind":"Name","value":"ingredients"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderModel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"mealType"}},{"kind":"Field","name":{"kind":"Name","value":"orderStatus"}},{"kind":"Field","name":{"kind":"Name","value":"hasViewerVoted"}},{"kind":"Field","name":{"kind":"Name","value":"voteCount"}},{"kind":"Field","name":{"kind":"Name","value":"voters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserModel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chefs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserModel"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chefCount"}},{"kind":"Field","name":{"kind":"Name","value":"recipe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RecipeModel"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;