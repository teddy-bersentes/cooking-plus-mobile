import React from "react";
import { Path, Svg } from "~/components";
import { IconProps } from "./types";

type Props = IconProps

export function IconGroup(props: Props) {
	return (
		<Svg viewBox="0 0 146 70" fill="currentColor" {...props}>
			<Path d="M49.2393 69.9512H96.4557C102.999 69.9512 105.148 68.0957 105.148 64.7266C105.148 54.8145 92.7447 41.1426 72.8721 41.1426C52.9502 41.1426 40.5479 54.8145 40.5479 64.7266C40.5479 68.0957 42.6963 69.9512 49.2393 69.9512ZM72.8721 34.3066C81.0264 34.3066 88.253 26.9336 88.253 17.3145C88.253 7.74414 81.0264 0.810547 72.8721 0.810547C64.7178 0.810547 57.4423 7.93955 57.4423 17.4121C57.4423 26.9336 64.669 34.3066 72.8721 34.3066ZM7.78415 69.9512H35.7627C31.8565 63.4571 37.1788 51.8359 45.3331 45.6836C41.085 42.998 35.7139 41.0449 28.7803 41.0449C11.4951 41.0449 0.655273 53.9355 0.655273 64.4336C0.655273 67.9004 2.55955 69.9512 7.78415 69.9512ZM28.7803 35.1855C35.9092 35.1855 42.2081 28.7402 42.2081 20.3906C42.2081 12.041 35.9092 6.03524 28.7803 6.03524C21.7002 6.03524 15.3526 12.1875 15.3526 20.4883C15.3526 28.7402 21.7002 35.1855 28.7803 35.1855ZM137.911 69.9512C143.136 69.9512 145.04 67.9004 145.04 64.4336C145.04 53.9355 134.201 41.0449 116.915 41.0449C109.982 41.0449 104.611 42.998 100.314 45.6836C108.517 51.8359 113.839 63.4571 109.933 69.9512H137.911ZM116.867 35.1855C123.995 35.1855 130.343 28.7402 130.343 20.4883C130.343 12.1875 123.995 6.03524 116.867 6.03524C109.786 6.03524 103.488 12.041 103.488 20.3906C103.488 28.7402 109.786 35.1855 116.867 35.1855Z" fill="currentColor" />
		</Svg>
	)
}
