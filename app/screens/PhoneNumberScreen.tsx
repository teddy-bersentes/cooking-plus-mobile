import React, { useState, useMemo } from "react";
import { Alert } from 'react-native'
import { Screen, Button, Input, Text, KeyboardView, Tappable, Loader } from "~/components";
import { AppStackScreenProps } from "./AppNavigator";
import { useHeader } from "~/utils/header";
import { Keyboard, TextInput } from "react-native";
import { auth0 } from "~/utils/auth";
import PhoneInput from "react-native-phone-number-input";
import { CountryCode, getCallingCode } from "react-native-country-picker-modal";
import { useMutation } from "@tanstack/react-query";

type Props = AppStackScreenProps<"PhoneNumber">;

export function PhoneNumberScreen({ navigation, route }: Props) {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [countryCode, setCountryCode] = useState<CountryCode>("US");
	const isValid = useMemo(() => phoneNumber.length > 3, [phoneNumber])

	const authMutation = useMutation({
		mutationFn: async () => {
			const formatted = await formatPhoneNumber({
				phoneNumber,
				countryCode
			})

			if (!/^\+[0-9]{1,15}$/.test(formatted)) {
				throw new Error('Invalid phone number')
			}

			return auth0.auth.passwordlessWithSMS({
				phoneNumber: formatted,
				send: 'code',
				authParams: {
					scope: 'openid profile email address phone offline_access',
					audience: 'https://api.cookplus.app'
				}
			})
		},
		onSuccess: () => navigation.navigate('Code', { phoneNumber }),
		onError: error => {
			if (error instanceof Error && error.message === 'Invalid phone number') {
				return Alert.alert(
					'Invalid phone number',
					'Please enter a valid phone number'
				)
			}
			return Alert.alert(
				'Error',
				'An error occurred while sending the code. Please try again.',
			)
		}
	})

	useHeader({
		headerLargeTitle: true,
		headerLargeTitleShadowVisible: false,
		headerBackVisible: false,
		title: 'Phone Number'
	})

	return (
		<Tappable onPress={Keyboard.dismiss}>
			<Screen tw='px-5 justify-between'>
				<KeyboardView tw='w-full h-full flex flex-col justify-between' behavior='padding'>
					<PhoneInput
						autoFocus
						value={phoneNumber}
						onChangeText={setPhoneNumber}
						defaultCode='US'
						onChangeCountry={region => setCountryCode(region.cca2)}
						layout='first'
						containerStyle={{ width: '100%', backgroundColor: '#F2F2F7', borderRadius: 16, marginTop: 12 }}
						textContainerStyle={{ paddingLeft: 2, backgroundColor: 'transparent' }}
						flagButtonStyle={{ backgroundColor: 'transparent' }}
						textInputProps={{
							autoComplete: 'tel',
							keyboardType: 'phone-pad',
						}}
					/>

					<Button
						variant='primary'
						tw='mb-3'
						disabled={!isValid || authMutation.isLoading}
						onPress={() => authMutation.mutate()}
					>
						{authMutation.isLoading ? (
							<Loader color='white' tw='h-[22px] w-[22px]' />
						) : (
							<Text variant='primary-button'>Continue</Text>
						)}
					</Button>
				</KeyboardView>
			</Screen>
		</Tappable>
	)
}

const formatPhoneNumber = async (params: { phoneNumber: string, countryCode: CountryCode }): Promise<string> => {
	// formats a phone number to: /^\+[0-9]{1,15}$/
	const { phoneNumber, countryCode } = params
	const phone = phoneNumber.replace(/[^\d]/g, '')
	const code = await getCallingCode(countryCode)
	const number = `+${code}${phone}`
	return number
}