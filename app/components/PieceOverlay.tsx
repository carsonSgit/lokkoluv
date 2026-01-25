"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getLocalImageUrl } from "@/lib/behoben-data";
import type { BehobenPiece } from "@/lib/types";
import BehobenFooter from "./BehobenFooter";
import Navbar from "./Navbar";

interface PieceOverlayProps {
	piece: BehobenPiece;
	isOpen: boolean;
	onClose: () => void;
}

export default function PieceOverlay({
	piece,
	isOpen,
	onClose,
}: PieceOverlayProps) {
	const overlayRef = useRef<HTMLDivElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		document.body.style.overflow = "hidden";
		closeButtonRef.current?.focus();

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}

			if (e.key === "Tab" && overlayRef.current) {
				const focusableElements = overlayRef.current.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				);
				const firstElement = focusableElements[0] as HTMLElement;
				const lastElement = focusableElements[
					focusableElements.length - 1
				] as HTMLElement;

				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				} else if (!e.shiftKey && document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			ref={overlayRef}
			className="fixed inset-0 z-[100] bg-white overflow-y-auto"
			role="dialog"
			aria-modal="true"
			aria-labelledby="overlay-title"
		>
			<Navbar />
			<header className="pt-16 text-center">
				<Link href="/">
					<h1 className="font-extrabold text-[clamp(3rem,10vw,9rem)] text-black">
						LOKKOLUV
					</h1>
				</Link>
				<h2
					id="overlay-title"
					className="font-medium text-[clamp(1.875rem,4.5vw,3rem)] tracking-[0.3em] text-black mt-2"
				>
					{piece.title}
				</h2>
			</header>

			<div className="container max-w-[90%] mx-auto px-4 pt-8">
				<button
					ref={closeButtonRef}
					type="button"
					onClick={onClose}
					className="text-black text-md tracking-[0.2em] font-bold flex items-center gap-1 hover:underline underline-offset-4 transition-colors cursor-pointer min-h-[44px]"
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
					BACK
				</button>
			</div>

			<div className="container max-w-[90%] mx-auto px-4 py-8">
				<div className="flex flex-col md:flex-row gap-12 md:gap-16">
					<div className="md:w-1/2">
						<Image
							src={getLocalImageUrl(piece.image_filename)}
							alt={piece.title}
							width={800}
							height={800}
							sizes="(max-width: 768px) 90vw, 45vw"
							className="w-full h-auto object-cover bg-[#f5f5f5]"
							style={{ borderRadius: 0 }}
							priority
						/>
					</div>

					<div className="md:w-1/2 space-y-8">
						<div className="space-y-1">
							<p className="text-black text-[20px] flex items-center gap-2">
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<circle
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="2"
									/>
									<path
										d="M14.5 9.5C13.97 9.18 13.26 9 12.5 9C10.29 9 8.5 10.79 8.5 13C8.5 15.21 10.29 17 12.5 17C13.26 17 13.97 16.82 14.5 16.5"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
								<span className="font-bold">
									{piece.title}, {piece.year}
								</span>
							</p>
							<p className="text-black text-[20px]">by LOKKOLUV</p>
						</div>

						<div className="space-y-2">
							{piece.size && (
								<div>
									<p className="text-black text-[20px] font-bold tracking-[0.1em]">
										SIZE:
									</p>
									<p className="text-black text-[20px]">{piece.size}</p>
								</div>
							)}

							{piece.mediums && (
								<div>
									<p className="text-black text-[20px] font-bold tracking-[0.1em]">
										MEDIUMS:
									</p>
									<p className="text-black text-[20px]">{piece.mediums}</p>
								</div>
							)}

							{piece.techniques && (
								<div>
									<p className="text-black text-[20px] font-bold tracking-[0.1em]">
										TECHNIQUES:
									</p>
									<p className="text-black text-[20px]">{piece.techniques}</p>
								</div>
							)}

							{piece.surface && (
								<div>
									<p className="text-black text-[20px] font-bold tracking-[0.1em]">
										SURFACE:
									</p>
									<p className="text-black text-[20px]">{piece.surface}</p>
								</div>
							)}
						</div>

						<div className="pt-8 border-t border-black/20">
							<p className="text-black text-[20px] font-bold tracking-[0.1em] mb-4">
								CONTACT FOR INQUIRY
							</p>
							<div className="space-y-1">
								<a
									href="https://www.instagram.com/lokkoluv/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-black text-[20px] hover:underline underline-offset-4 block transition-colors cursor-pointer"
								>
									@lokkoluv
								</a>
								<a
									href="mailto:inquiry@lokkoluv.com"
									className="text-black text-[20px] hover:underline underline-offset-4 block transition-colors cursor-pointer"
								>
									inquiry@lokkoluv.com
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<BehobenFooter />
		</div>
	);
}
