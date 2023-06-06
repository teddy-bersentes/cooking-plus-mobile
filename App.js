import "expo-dev-client";
import App from "./app/app.tsx";
import React from "react";
import { registerRootComponent } from "expo";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

function IgniteApp() {
	return <App hideSplashScreen={SplashScreen.hideAsync} />;
}

registerRootComponent(IgniteApp);
export default IgniteApp;
