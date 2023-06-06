import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	schema: "http://localhost:3000/graphql",
	documents: ["app/**/*.{gql,ts,tsx}"],
	ignoreNoDocuments: true,
	config: {
		scalars: {
			DateTime: "string",
			ID: "string"
		}
	},
	generates: {
		'./app/lib/graphql/generated/': {
			preset: 'client-preset',
			plugins: [],
			presetConfig: {
				fragmentMasking: {
					unmaskFunctionName: 'defrag'
				}
			}
		},
		'./graphql.schema.json': {
			plugins: [
				'introspection'
			]
		}
	}
}

export default config;