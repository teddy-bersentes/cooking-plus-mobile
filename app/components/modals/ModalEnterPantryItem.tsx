import React, { useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button, Input, KeyboardView, Loader, Text, View } from '~/components'
import { useModal } from "~/lib/modals";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREEN } from "~/utils/constants";
import { useIsKeyboardVisible } from "~/utils/keyboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import { apiClient, writePantryItemsDoc } from "~/lib/graphql";

type Props = Omit<React.ComponentProps<typeof BottomSheetModal>, 'snapPoints' | 'children'>

const MODAL_GAP = 0.1 * SCREEN.height // the remaining 10% of the screen

export function ModalEnterPantryItem(props: Props) {
	const queryClient = useQueryClient()
	const safeArea = useSafeAreaInsets()
	const { recipeModal } = useModal()
	const [text, setText] = useState<string>('')

	const { mutate, status } = useMutation({
		mutationFn: async () => apiClient.request(writePantryItemsDoc, { text }),
		onSuccess: async () => {
			await queryClient.invalidateQueries(['pantry-items'])
			recipeModal.current?.dismiss()
			setText('')
		},
		onError: (error) => {
			console.error(error)
			Alert.alert('Error', 'Something went wrong. Please try again later.')
		}
	})


	return (
		<BottomSheetModal
			ref={recipeModal}
			snapPoints={['90%']}
			enablePanDownToClose
			enableContentPanningGesture={false}
			enableHandlePanningGesture={true}
			onDismiss={() => setText('')}
			{...props}
		>
			<KeyboardView behavior='padding'>
				<View tw='w-full h-full flex flex-col justify-between px-5' style={{ paddingBottom: MODAL_GAP + safeArea.bottom }}>
					<View tw='flex flex-col w-full grow'>
						<Text tw='text-2xl font-bold'>Enter pantry item</Text>

						<Input
							tw='w-full bg-[#7676801F] px-4 py-2.5 rounded-xl mt-4 text-[15px] tracking-[-0.41px] leading-[22px] max-h-[60%]'
							placeholder='Write here...'
							value={text}
							onChangeText={setText}
							multiline
							autoFocus
							autoCorrect
						/>
					</View>

					<Button variant='primary' disabled={text.length < 1 || status === 'loading'} tw='mt-8 mb-4' onPress={() => mutate()}>
						{status === 'loading' ? (
							<Loader color='white' />
						) : (
							<Text variant='primary-button'>
								Submit
							</Text>
						)}
					</Button>
				</View>
			</KeyboardView>
		</BottomSheetModal>
	)
}