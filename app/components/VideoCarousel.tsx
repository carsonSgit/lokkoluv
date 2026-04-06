import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import VideoEmbed from "./VideoEmbed";

interface VideoCarouselProps {
	videos: { id: string; youtubeId: string; title: string }[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
	if (!videos || videos.length === 0) return null;

	return (
		<Carousel
			opts={{
				align: "start",
				loop: false,
			}}
			className="w-full"
		>
			<CarouselContent className="-ml-6">
				{videos.map((video) => (
					<CarouselItem
						key={video.id}
						className="pl-6 md:basis-1/2 xl:basis-[45%]"
					>
						<article className="space-y-4">
							<div className="relative aspect-video overflow-hidden">
								<VideoEmbed youtubeId={video.youtubeId} title={video.title} />
							</div>
							<h3 className="text-sm font-medium tracking-tight text-black/70">
								{video.title}
							</h3>
						</article>
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
