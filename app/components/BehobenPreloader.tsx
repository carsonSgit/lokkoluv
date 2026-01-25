"use client";

import { useEffect } from "react";
import { behobenPieces, getLocalImageUrl } from "@/lib/behoben-data";

/**
 * Preloads all behoben gallery images in the background when the site loads.
 * Uses requestIdleCallback to avoid blocking the main thread.
 */
export default function BehobenPreloader() {
	useEffect(() => {
		const preloadImages = () => {
			behobenPieces.forEach((piece) => {
				const img = new Image();
				img.src = getLocalImageUrl(piece.image_filename);
			});
		};

		// Use requestIdleCallback if available, otherwise use setTimeout
		if ("requestIdleCallback" in window) {
			requestIdleCallback(preloadImages, { timeout: 2000 });
		} else {
			// Fallback: wait a bit for critical content to load first
			setTimeout(preloadImages, 1000);
		}
	}, []);

	return null;
}
