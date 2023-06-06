const plugins = [
	[
		"@babel/plugin-proposal-decorators",
		{
			legacy: true,
		},
	],
	[
		"babel-plugin-root-import",
		{
			root: __dirname,
			rootPathPrefix: "~/",
			rootPathSuffix: "app",
		},
	],
	["nativewind/babel"],
	["@babel/plugin-proposal-optional-catch-binding"],
	"@babel/plugin-proposal-export-namespace-from",
	"react-native-reanimated/plugin", // NOTE: this must be last in the plugins
];

const expoConfig = {
	presets: ["babel-preset-expo"],
	env: {
		production: {},
	},
	plugins,
};

module.exports = expoConfig;
