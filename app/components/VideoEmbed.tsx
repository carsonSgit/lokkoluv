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
	const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

	return (
		<div className="flex w-full flex-col gap-4">
			{showTitle && title && (
				<h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-medium text-black">
					{title}
				</h3>
			)}
			<div className="relative aspect-video w-full overflow-hidden bg-black/5">
				{!isPlaying ? (
					<button
						type="button"
						className="absolute inset-0 flex h-full w-full cursor-pointer items-end justify-start p-5 text-left focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
						onClick={() => setIsPlaying(true)}
						aria-label={`Play video ${title}`}
					>
						<Image
							src={thumbnailUrl}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
							className="object-cover"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-black/20" />
						<span className="relative inline-flex items-center gap-3 border border-white bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
							</svg>
							Play film
						</span>
					</button>
				) : (
					<iframe
						src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&modestbranding=1&playsinline=1&rel=0`}
						title={title}
						className="absolute inset-0 h-full w-full"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				)}
			</div>
		</div>
	);
}
