import React, { useState } from 'react';
import { View, Text, Screen, Button } from '~/components';
import { MainStackScreenProps } from '.';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '~/lib/store/auth';
import { auth0 } from '~/utils/auth';

type Props = MainStackScreenProps<'Family'>

export function FamilyScreen({ navigation }: Props) {
	const user = useAuthStore(state => state.user)

	return (
		<Screen tw='px-5'>
			<Text tw='mb-4'>User:{user?.phoneNumber}</Text>

			<Button variant='secondary' onPress={async () => {
				useAuthStore.setState({ user: null })
			}}>
				<Text>Sign out</Text>
			</Button>
		</Screen>
	)
}
