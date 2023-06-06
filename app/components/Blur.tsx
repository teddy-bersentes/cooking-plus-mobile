import { BlurView } from 'expo-blur'
import { styled } from 'nativewind'
import Animated from 'react-native-reanimated'

export const Blur = styled(BlurView)
export const MotionBlur = styled(Animated.createAnimatedComponent(BlurView))