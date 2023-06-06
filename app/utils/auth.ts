import Auth0 from "react-native-auth0";
import Config from "~/config";

export const auth0 = new Auth0({
	domain: Config.AUTH_DOMAIN,
	clientId: Config.AUTH_CLIENT_ID
})