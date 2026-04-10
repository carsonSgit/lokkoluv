"use client";

import dynamic from "next/dynamic";

const Eyeball3D = dynamic(() => import("../threejs/Eyeball3D"), {
	ssr: false,
});

export default function LazyEyeball3D() {
	return <Eyeball3D />;
}
