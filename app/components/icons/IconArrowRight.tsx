import React from "react";
import { Path, Svg } from "~/components";
import { IconProps } from "./types";
import clsx from "clsx";

type Props = IconProps

export function IconArrowRight({ tw, ...props }: Props) {
	return (
		<Svg viewBox="0 0 9 15" fill="currentColor" tw={clsx('rotate-180', tw)} {...props}>
			<Path d="M0.351562 7.35938C0.351562 7.51562 0.380208 7.66406 0.4375 7.80469C0.5 7.9401 0.596354 8.07031 0.726562 8.19531L6.74219 14.0781C6.9401 14.276 7.18229 14.375 7.46875 14.375C7.66667 14.375 7.84375 14.3281 8 14.2344C8.16146 14.1406 8.28906 14.0156 8.38281 13.8594C8.48177 13.7031 8.53125 13.526 8.53125 13.3281C8.53125 13.0417 8.42188 12.7865 8.20312 12.5625L2.85156 7.35938L8.20312 2.15625C8.42188 1.9375 8.53125 1.68229 8.53125 1.39062C8.53125 1.19792 8.48177 1.02344 8.38281 0.867188C8.28906 0.705729 8.16146 0.578125 8 0.484375C7.84375 0.390625 7.66667 0.34375 7.46875 0.34375C7.18229 0.34375 6.9401 0.442708 6.74219 0.640625L0.726562 6.52344C0.601562 6.64844 0.507812 6.77865 0.445312 6.91406C0.388021 7.04948 0.356771 7.19792 0.351562 7.35938Z" fill="currentColor" />
		</Svg>

	)
}
