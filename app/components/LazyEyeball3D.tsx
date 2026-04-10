"use client";

import dynamic from "next/dynamic";

const Eyeball3D = dynamic(() => import("../threejs/Eyeball3D"), {
	ssr: false,
	loading: () => (
		<div
			aria-hidden="true"
			className="h-[338px] w-[338px] rounded-full border border-black/10 bg-[radial-gradient(circle_at_45%_40%,#ffffff_0%,#f3f3f3_52%,#dfdfdf_100%)]"
		/>
	),
});

export default function LazyEyeball3D() {
	return <Eyeball3D />;
}
