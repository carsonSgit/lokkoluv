"use client";

import { useState } from "react";
import BehobenFooter from "@/app/components/BehobenFooter";
import GalleryGrid from "@/app/components/GalleryGrid";
import PageHeader from "@/app/components/PageHeader";
import PieceOverlay from "@/app/components/PieceOverlay";
import type { BehobenPiece } from "@/lib/types";

interface BehobenGalleryProps {
	pieces: BehobenPiece[];
}

export default function BehobenGallery({ pieces }: BehobenGalleryProps) {
	const [selectedPiece, setSelectedPiece] = useState<BehobenPiece | null>(null);

	const handlePieceClick = (piece: BehobenPiece) => {
		setSelectedPiece(piece);
	};

	const handleCloseOverlay = () => {
		setSelectedPiece(null);
	};

	return (
		<main className="w-full min-h-screen">
			<PageHeader subtitle="BEHOBEN" />

			{/* Gallery Grid */}
			<div className="container max-w-[90%] mx-auto px-4 py-12">
				<GalleryGrid pieces={pieces} onPieceClick={handlePieceClick} />
			</div>

			{/* Footer */}
			<BehobenFooter />

			{/* Piece Overlay */}
			{selectedPiece && (
				<PieceOverlay
					piece={selectedPiece}
					isOpen={!!selectedPiece}
					onClose={handleCloseOverlay}
				/>
			)}
		</main>
	);
}
