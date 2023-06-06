/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				"pro-display": "SFProDisplay_400Regular",
				"pro-display-medium": "SFProDisplay_500Medium",
				"pro-display-semibold": "SFProDisplay_600SemiBold",
				"pro-display-bold": "SFProDisplay_700Bold",
				"pro-text": "SFProText_400Regular",
				"pro-text-medium": "SFProText_500Medium",
				"pro-text-semibold": "SFProText_600SemiBold",
				"pro-text-bold": "SFProText_700Bold",
				"pro-rounded": "SFProRounded_500Medium",
			},
			colors: {
				system: {
					bg: {
						100: "#FFFFFF",
						200: "#F2F2F7",
					},
					"group-bg": "#F2F2F7",
					divider: {
						DEFAULT: "#3C3C434A",
						opaque: "#C6C6C8FF",
					},
					label: {
						DEFAULT: "#000000",
						100: "#000000",
						200: "#3C3C4399",
						300: "#3C3C434D",
						400: "#3C3C432E",
						placeholder: "#3C3C4399",
					},
					blue: "#007AFF",
					green: "#34C759",
					indigo: "#5856D6",
					orange: "#FF9500",
					pink: "#FF2D55",
					purple: "#AF52DE",
					red: "#FF3B30",
					teal: "#5AC8FA",
					yellow: "#FFCC00",
					mint: "#00C7BE",
					cyan: "#32ADE6",
					gray: {
						DEFAULT: "#8E8E93",
						100: "#8E8E93",
						200: "#AEAEB2",
						300: "#C7C7CC",
						400: "#D1D1D6",
						500: "#E5E5EA",
						600: "#F2F2F7",
					},
				},
			},
		},
	},
	plugins: [],
};
