"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BehobenFooter from "@/app/components/BehobenFooter";
import Navbar from "@/app/components/Navbar";
import { getImageUrl } from "@/lib/behoben-data";
import { defaultSettings } from "@/lib/fallbacks/settings";
import type { BehobenPiece, SiteSettings } from "@/lib/types";

interface PieceDetailsProps {
	piece: BehobenPiece;
	settings?: SiteSettings;
}

export default function PieceDetails({
	piece,
	settings = defaultSettings,
}: PieceDetailsProps) {
	const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
	const [isHovering, setIsHovering] = useState(false);

	const imageUrl = getImageUrl(piece);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;
		setZoomPosition({ x, y });
	};

	return (
		<main className="min-h-screen bg-white flex flex-col">
			<Navbar />
			<header className="pt-16 text-center">
				<Link href="/">
					<h1 className="font-extrabold text-[clamp(3rem,10vw,9rem)] text-black">
						LOKKOLUV
					</h1>
				</Link>
			</header>

			<div className="container max-w-[90%] mx-auto px-4 pt-8">
				<Link
					href="/works/behoben"
					className="inline-flex text-black text-md tracking-[0.2em] font-bold items-center gap-1 hover:underline underline-offset-4 transition-colors cursor-pointer min-h-[44px]"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M19 12H5M5 12L12 19M5 12L12 5"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					BACK TO BEHOBEN
				</Link>
			</div>

			<div className="container max-w-[90%] mx-auto px-4 py-8 flex-grow">
				<div className="flex flex-col md:flex-row gap-12 md:gap-16">
					<div className="md:w-1/2 flex justify-center">
						<div className="relative group w-full max-w-[600px]">
							<div
								role="img"
								className="w-full max-w-[600px] aspect-square relative overflow-hidden cursor-crosshair"
								onMouseMove={handleMouseMove}
								onMouseEnter={() => setIsHovering(true)}
								onMouseLeave={() => setIsHovering(false)}
							>
								<Image
									src={imageUrl}
									alt={piece.title}
									fill
									sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 600px"
									className="object-contain"
									priority
								/>
								{isHovering && (
									<div
										className="absolute w-[120px] h-[120px] border-2 border-black/40 pointer-events-none bg-black/5 hidden xl:block"
										style={{
											left: `${zoomPosition.x}%`,
											top: `${zoomPosition.y}%`,
											transform: "translate(-50%, -50%)",
										}}
									/>
								)}
							</div>
							{isHovering && (
								<div
									className="absolute left-[calc(100%+20px)] top-0 w-[400px] h-[400px] overflow-hidden bg-white border border-black/10 shadow-xl z-10 hidden xl:block"
									style={{
										backgroundImage: `url(${imageUrl})`,
										backgroundSize: "1200px 1200px",
										backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
									}}
								/>
							)}
						</div>
					</div>

					<div className="md:w-1/2 space-y-8">
						<div className="space-y-1">
							<p className="text-[#333] text-[20px] flex items-center gap-2">
								<span className="font-semibold">
									{piece.title}, {piece.year}
								</span>
							</p>
							<p className="text-[#333] text-[18px]">by LOKKOLUV</p>
						</div>

						<div className="space-y-2">
							{piece.size && (
								<div>
									<p className="text-[#333] text-[18px] font-bold tracking-[0.1em]">
										SIZE
									</p>
									<p className="text-[#333] text-[16px]">{piece.size}</p>
								</div>
							)}

							{piece.mediums && (
								<div>
									<p className="text-[#333] text-[18px] font-bold tracking-[0.1em]">
										MEDIUMS
									</p>
									<p className="text-[#333] text-[16px]">{piece.mediums}</p>
								</div>
							)}

							{piece.techniques && (
								<div>
									<p className="text-[#333] text-[18px] font-bold tracking-[0.1em]">
										TECHNIQUES
									</p>
									<p className="text-[#333] text-[16px]">{piece.techniques}</p>
								</div>
							)}

							{piece.surface && (
								<div>
									<p className="text-[#333] text-[18px] font-bold tracking-[0.1em]">
										SURFACE
									</p>
									<p className="text-[#333] text-[16px]">{piece.surface}</p>
								</div>
							)}
						</div>

						<div className="pt-8 border-t border-black/20">
							<p className="text-black text-[20px] font-bold tracking-[0.1em] mb-4">
								CONTACT FOR INQUIRY
							</p>
							<div className="space-y-1">
								{settings.instagram_url && (
									<a
										href={settings.instagram_url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-black text-[20px] hover:underline underline-offset-4 block transition-colors cursor-pointer"
									>
										{settings.instagram_handle}
									</a>
								)}
								<a
									href={`mailto:${settings.contact_email}`}
									className="text-black text-[20px] hover:underline underline-offset-4 block transition-colors cursor-pointer"
								>
									{settings.contact_email}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<BehobenFooter settings={settings} />
		</main>
	);
}
