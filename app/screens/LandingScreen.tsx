import React from "react";
import { Button, Screen, View, Image, Text } from "~/components";
import { AppStackScreenProps } from "./AppNavigator";

type Props = AppStackScreenProps<'Landing'>;

export function LandingScreen({ navigation }: Props) {
	return (
		<Screen tw='justify-between'>
			<View tw='w-full flex flex-col'>
				<View tw='h-72 w-full flex-row'>
					<View tw='w-1/4 flex flex-col -ml-[18px] mt-8'>
						<Image source={require('../../assets/images/landing-1.jpg')} tw='w-full aspect-square rounded-md' />
						<Image source={require('../../assets/images/landing-2.jpg')} tw='w-full aspect-square rounded-md mt-4' />
					</View>
					<View tw='w-1/4 flex flex-col ml-4 mt-16'>
						<Image source={require('../../assets/images/landing-3.jpg')} tw='w-full aspect-square rounded-md' />
						<Image source={require('../../assets/images/landing-4.jpg')} tw='w-full aspect-square rounded-md mt-4' />
					</View>
					<View tw='w-1/4 flex flex-col ml-4 mt-4'>
						<Image source={require('../../assets/images/landing-5.jpg')} tw='w-full aspect-square rounded-md' />
						<Image source={require('../../assets/images/landing-6.jpg')} tw='w-full aspect-square rounded-md mt-4' />
					</View>
					<View tw='w-1/4 flex flex-col ml-4 mt-12'>
						<Image source={require('../../assets/images/landing-7.jpg')} tw='w-full aspect-square rounded-md' />
						<Image source={require('../../assets/images/landing-8.jpg')} tw='w-full aspect-square rounded-md mt-4' />
					</View>
				</View>

				<View tw='flex flex-col justify-center items-center px-4 mt-10'>
					<Text tw='font-pro-display-bold tracking-[0.37px] leading-10 text-[32px] mb-2'>
						Cook up a storm
					</Text>

					<Text tw='text-center font-pro-display text-base leading-6 text-[#48484A]'>
						Bring your family and friends together over delicious meals with recipe voting and sharing.
					</Text>
				</View>
			</View>

			<View tw='w-full px-5'>
				<Button variant='primary' tw='mb-1' onPress={() => navigation.navigate('PhoneNumber')}>
					<Text variant='primary-button'>
						Get Started
					</Text>
				</Button>
			</View>
		</Screen>
	)
}