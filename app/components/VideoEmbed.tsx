"use client";

import Image from "next/image";
import { useState } from "react";

type VideoEmbedProps = {
	youtubeId: string;
	title?: string;
	showTitle?: boolean;
};

export default function VideoEmbed({
	youtubeId,
	title = "YouTube Video",
	showTitle = false,
}: VideoEmbedProps) {
	const [isPlaying, setIsPlaying] = useState(false);

	// High quality thumbnail URL from YouTube
	const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

	return (
		<div className="w-full flex flex-col gap-4">
			{showTitle && title && (
				<h3 className="font-medium text-[clamp(1.25rem,2vw,1.5rem)] text-black">
					{title}
				</h3>
			)}
			<div className="relative w-full aspect-video bg-black/5 overflow-hidden group">
				{!isPlaying ? (
					<button
						type="button"
						className="absolute inset-0 w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 flex items-center justify-center"
						onClick={() => setIsPlaying(true)}
						aria-label={`Play video ${title}`}
					>
						<Image
							src={thumbnailUrl}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, 80vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
							loading="lazy"
						/>
						{/* Play Button Overlay */}
						<div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
							<div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="ml-2 text-black"
									aria-hidden="true"
								>
									<path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
								</svg>
							</div>
						</div>
					</button>
				) : (
					<iframe
						src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
						title={title}
						className="absolute inset-0 w-full h-full"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}
