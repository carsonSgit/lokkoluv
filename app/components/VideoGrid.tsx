import VideoEmbed from "./VideoEmbed";

export type VideoItem = {
	id: string;
	youtubeId: string;
	title?: string;
};

interface VideoGridProps {
	videos: VideoItem[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
			{videos.map((video) => (
				<VideoEmbed
					key={video.id}
					youtubeId={video.youtubeId}
					title={video.title}
					showTitle={false} // Keeping it minimalist to match the design theme
				/>
			))}
		</div>
	);
}
