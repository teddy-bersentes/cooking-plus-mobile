import { Image as ExpoImage } from 'expo-image'
import { styled } from 'nativewind'
import Animated from 'react-native-reanimated'

export const Image = styled(ExpoImage)
export const MotionImage = Animated.createAnimatedComponent(Image)