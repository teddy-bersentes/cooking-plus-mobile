import { useEffect } from "react";
import { AppStateStatus, AppState } from "react-native";
import { focusManager } from "@tanstack/react-query";

export const useAppStateRefresh = () => {
	useEffect(() => {
		const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
			focusManager.setFocused(status === "active");
		})
		return () => subscription.remove()
	}, [])
}