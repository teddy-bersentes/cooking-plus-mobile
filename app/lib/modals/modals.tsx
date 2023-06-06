import React, { createContext, useContext, useRef, RefObject } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

type Context = {
	recipeModal: RefObject<BottomSheetModalMethods>
}

const ModalContext = createContext<Context>({} as Context)

export function ModalProvider({ children }: { children?: React.ReactNode }) {
	const recipeModal = useRef<BottomSheetModalMethods>(null)

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<ModalContext.Provider value={{ recipeModal }}>
					{children}
				</ModalContext.Provider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	)
}

export const useModal = () => useContext(ModalContext)