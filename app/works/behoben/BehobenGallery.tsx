"use client";

import { useState } from "react";
import BehobenFooter from "@/app/components/BehobenFooter";
import GalleryGrid from "@/app/components/GalleryGrid";
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
			{/* Header */}
			<header className="pt-16 text-center">
				<h1 className="font-extrabold text-[clamp(3rem,10vw,9rem)] text-black">
					LOKKOLUV
				</h1>
				<h2 className="font-medium text-[clamp(1.875rem,4.5vw,3rem)] tracking-[0.3em] text-black mt-2">
					BEHOBEN
				</h2>
			</header>

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
