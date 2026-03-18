"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { getImageUrl } from "@/lib/behoben-data";
import type { BehobenPiece } from "@/lib/types";

interface GalleryGridProps {
	pieces: BehobenPiece[];
}

export default function GalleryGrid({
	pieces,
}: GalleryGridProps) {
	const preloadedImagesRef = useRef<Set<string>>(new Set());

	const handleMouseEnter = useCallback((piece: BehobenPiece) => {
		const imageUrl = getImageUrl(piece);

		if (preloadedImagesRef.current.has(imageUrl)) return;

		preloadedImagesRef.current.add(imageUrl);
		const img = new window.Image();
		img.src = imageUrl;
	}, []);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
			{pieces.map((piece, index) => (
				<Link
					key={piece.id}
					href={`/works/behoben/${piece.piece_number}`}
					onMouseEnter={() => handleMouseEnter(piece)}
					className="relative group cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
					style={{ borderRadius: 0 }}
				>
					<Image
						src={getImageUrl(piece)}
						alt={piece.title}
						width={400}
						height={400}
						sizes="(max-width: 768px) 90vw, 30vw"
						className="w-full h-auto object-cover transition-transform duration-300 bg-[#f5f5f5]"
						style={{ borderRadius: 0 }}
						priority={index < 6}
						loading={index < 6 ? "eager" : "lazy"}
					/>

					<div
						className="absolute inset-0 bg-[#98989896] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"
						style={{ borderRadius: 0 }}
					>
						<h3 className="text-white font-extrabold text-[clamp(1.25rem,3vw,2rem)] tracking-tight">
							{piece.title}
						</h3>
						<p className="text-white text-sm tracking-[0.2em] mt-2">SEE MORE</p>
					</div>
				</Link>
			))}
		</div>
	);
}
