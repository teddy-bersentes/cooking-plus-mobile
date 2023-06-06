import React, { useState, useRef, useMemo } from 'react';
import { Button, Input, KeyboardView, Loader, Screen, Tappable, Text } from '~/components';
import { useHeader } from '~/utils/header';
import { Alert, Keyboard, TextInput } from 'react-native';
import { auth0 } from '~/utils/auth';
import { AppStackScreenProps } from '.';
import { useAuthStore } from '~/lib/store/auth';
import { useMutation } from '@tanstack/react-query';

type Props = AppStackScreenProps<'Code'>

export function CodeScreen({ navigation, route }: Props) {
	const phoneNumber = route.params.phoneNumber
	const [code, setCode] = useState<string>("");
	const isValid = useMemo<boolean>(() => /^[0-9]{6}$/.test(code), [code])

	const codeMutation = useMutation({
		mutationFn: async () => {
			const result = await auth0.auth.loginWithSMS({
				phoneNumber,
				code,
				scope: 'openid profile email address phone offline_access',
				audience: 'https://api.cookplus.app'
			})

			const userInfo = await auth0.auth.userInfo<{ phoneNumber: string }>({
				token: result.accessToken
			})

			if (!result.idToken || !result.refreshToken) {
				throw new Error('No idToken or refreshToken')
			}

			return { authInfo: result, userInfo }
		},
		onSuccess: ({ authInfo, userInfo }) => {
			useAuthStore.setState({
				user: {
					accessToken: authInfo.accessToken,
					expiresIn: authInfo.expiresIn,
					id: userInfo.sub,
					phoneNumber: userInfo.phoneNumber,
					// We verify these exist in the mutation
					refreshToken: authInfo.refreshToken as string,
					idToken: authInfo.idToken as string,
					refreshedAt: null
				}
			})
		},
		onError: error => {
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
		title: 'Verify Code'
	})

	return (
		<Tappable onPress={Keyboard.dismiss}>
			<Screen tw='px-5 justify-between'>
				<KeyboardView tw='w-full h-full flex flex-col justify-between' behavior='padding'>
					<Input
						tw='w-full bg-gray-100 px-4 py-2.5 rounded-lg mt-5'
						placeholder='SMS Code'
						value={code}
						onChangeText={setCode}
						keyboardType='phone-pad'
						autoComplete='sms-otp'
						autoFocus
					/>

					<Button
						variant='primary'
						tw='mb-3'
						disabled={!isValid || codeMutation.isLoading}
						onPress={() => codeMutation.mutate()}
					>
						{codeMutation.isLoading ? (
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