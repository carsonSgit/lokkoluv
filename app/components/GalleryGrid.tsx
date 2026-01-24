"use client";

import Image from "next/image";
import type { BehobenPiece } from "@/lib/types";
import { getImageUrl } from "@/lib/supabase";

interface GalleryGridProps {
	pieces: BehobenPiece[];
	onPieceClick: (piece: BehobenPiece) => void;
}

export default function GalleryGrid({ pieces, onPieceClick }: GalleryGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
			{pieces.map((piece) => (
				<button
					key={piece.id}
					type="button"
					onClick={() => onPieceClick(piece)}
					className="relative group cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
					style={{ borderRadius: 0 }}
				>
					<Image
						src={getImageUrl(piece.image_filename)}
						alt={piece.title}
						width={400}
						height={400}
						className="w-full h-auto object-cover transition-transform duration-300"
						style={{ borderRadius: 0 }}
						loading="lazy"
					/>

					{/* Hover Overlay */}
					<div
						className="absolute inset-0 bg-[#98989896] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"
						style={{ borderRadius: 0 }}
					>
						<h3 className="text-white font-extrabold text-[clamp(1.25rem,3vw,2rem)] tracking-tight">
							{piece.title}
						</h3>
						<p className="text-white text-sm tracking-[0.2em] mt-2">
							SEE MORE
						</p>
					</div>
				</button>
			))}
		</div>
	);
}
