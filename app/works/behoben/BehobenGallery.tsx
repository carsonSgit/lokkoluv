"use client";

import BehobenFooter from "@/app/components/BehobenFooter";
import GalleryGrid from "@/app/components/GalleryGrid";
import PageHeader from "@/app/components/PageHeader";
import type { BehobenPiece, SiteSettings } from "@/lib/types";

interface BehobenGalleryProps {
	pieces: BehobenPiece[];
	settings: SiteSettings;
}

export default function BehobenGallery({ pieces, settings }: BehobenGalleryProps) {
	return (
		<main className="w-full min-h-screen">
			<PageHeader subtitle="BEHOBEN" />

			{/* Gallery Grid */}
			<div className="container max-w-[90%] mx-auto px-4 py-16 md:py-24">
				<GalleryGrid pieces={pieces} />
			</div>

			{/* Footer */}
			<BehobenFooter settings={settings} />
		</main>
	);
}
