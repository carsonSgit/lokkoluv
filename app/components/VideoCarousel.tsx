import * as React from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import VideoEmbed from "./VideoEmbed";

interface VideoCarouselProps {
	videos: { id: string; youtubeId: string; title: string }[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
	if (!videos || videos.length === 0) return null;

	return (
		<div className="w-full max-w-5xl mx-auto px-12 md:px-16 relative group">
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{videos.map((video) => (
						<CarouselItem
							key={video.id}
							className="pl-4 md:basis-1/2 lg:basis-1/2 xl:basis-1/2"
						>
							<div className="p-1">
								<div className="aspect-video relative rounded-lg overflow-hidden border border-black/10 shadow-sm transition-transform duration-300 hover:scale-[1.02]">
									<VideoEmbed
										youtubeId={video.youtubeId}
										title={video.title}
									/>
								</div>
								<h3 className="mt-4 font-medium text-lg text-black px-1 line-clamp-1">
									{video.title}
								</h3>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="hidden group-hover:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 opacity-70 hover:opacity-100 transition-opacity" />
				<CarouselNext className="hidden group-hover:flex absolute -right-12 top-1/2 -translate-y-1/2 z-10 opacity-70 hover:opacity-100 transition-opacity" />
			</Carousel>
		</div>
	);
}
