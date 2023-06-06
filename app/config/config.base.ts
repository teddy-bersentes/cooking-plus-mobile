import * as Application from 'expo-application'

export interface ConfigBaseProps {
	build: string | null
}


const BaseConfig: ConfigBaseProps = {
	build: Application.nativeBuildVersion
}

export default BaseConfig
