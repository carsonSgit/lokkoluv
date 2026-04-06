"use client";

import { Dithering } from "@paper-design/shaders-react";

export default function LandingDitheringOverlay() {
	return (
		<Dithering
			speed={0.08}
			shape="warp"
			type="2x2"
			size={2}
			scale={1.12}
			frame={26874.24100019075}
			colorBack="#00000000"
			colorFront="#6969691a"
			className="h-full w-full"
			style={{ height: "100%", width: "100%" }}
		/>
	);
}
