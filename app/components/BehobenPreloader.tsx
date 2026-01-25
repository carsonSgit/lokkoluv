"use client";

import { useEffect } from "react";
import { behobenPieces, getLocalImageUrl } from "@/lib/behoben-data";

function getNextImageUrl(
	src: string,
	width: number,
	quality: number = 75,
): string {
	return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
}

export default function BehobenPreloader() {
	useEffect(() => {
		const preloadImages = () => {
			behobenPieces.forEach((piece) => {
				const src = getLocalImageUrl(piece.image_filename);

				const thumbImg = new Image();
				thumbImg.src = getNextImageUrl(src, 640);

				const largeImg = new Image();
				largeImg.src = getNextImageUrl(src, 1080);
			});
		};

		if ("requestIdleCallback" in window) {
			requestIdleCallback(preloadImages, { timeout: 2000 });
		} else {
			setTimeout(preloadImages, 1000);
		}
	}, []);

	return null;
}
