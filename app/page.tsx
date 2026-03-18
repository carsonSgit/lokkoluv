import Image from "next/image";
import PageHeader from "./components/PageHeader";
import SocialLinks from "./components/SocialLinks";
import Eyeball3D from "./threejs/Eyeball3D";
import VideoGrid from "./components/VideoGrid";
import { getHomepageData } from "@/lib/public-data";

// Static video list
const featuredVideos = [
	{ id: "v1", youtubeId: "Nqq2EG53-p4", title: "Video 1" },
	{ id: "v2", youtubeId: "2BvXiX9VfwQ", title: "Video 2" },
	{ id: "v3", youtubeId: "PuAAxd_aIJ8", title: "Video 3" },
	{ id: "v4", youtubeId: "NZTkXCGT2Pc", title: "Video 4" },
	{ id: "v5", youtubeId: "5ishw3KWW7w", title: "Video 5" },
	{ id: "v6", youtubeId: "L_FGmJh7Eco", title: "Video 6" },
];

export default async function Home() {
	const { sectionVisibility, workItems, clothingItems, content, settings } =
		await getHomepageData();

	const bannerText = content.banner_text || "WE ARE ALL SINNERS";
	const comingSoonText = content.coming_soon_text || "7 SINS COMING SOON";

	return (
		<main className="w-full">
			<PageHeader />

			{/* Work Previews Section */}
			{sectionVisibility.works !== false && workItems.length > 0 && (
				<div className="container max-w-[90%] mx-auto px-4 pb-16">
					<section className="mt-8">
						<div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-16 md:gap-20">
							{workItems.map((item, index) => (
								<div key={item.id} className="space-y-4">
									<Image
										src={
											item.image_url || `/images/${item.image_filename}`
										}
										alt={item.title || `Work ${index + 1}`}
										width={200}
										height={200}
										priority={index < 2}
										sizes="(max-width: 768px) 90vw, 45vw"
										className="w-full h-auto object-cover"
										decoding={index < 2 ? "sync" : "async"}
										loading={index < 2 ? undefined : "lazy"}
									/>
									<h3 className="font-medium text-[clamp(1.25rem,2vw,1.5rem)] text-black">
										{item.title || "Title"}
									</h3>
								</div>
							))}
						</div>
					</section>
				</div>
			)}

			{/* Video Section */}
			<div className="container max-w-[90%] mx-auto px-4 py-16">
				<section>
					<VideoGrid videos={featuredVideos} />
				</section>
			</div>

			{/* Banner Section */}
			{sectionVisibility.banner !== false && (
				<div className="w-full my-16 md:my-24">
					<section className="bg-[#1e1e1e] py-24 md:py-32">
						<div className="relative h-auto flex flex-col justify-center space-y-8 md:space-y-12 overflow-hidden">
							{[...Array(7)].map((_, i) => (
								<p
									key={`sinner-text-${i}`}
									className="text-white text-[clamp(1.5rem,4vw,3rem)] tracking-[clamp(10px,3vw,40px)] text-center font-bold whitespace-nowrap"
								>
									{bannerText}
								</p>
							))}
						</div>
					</section>
				</div>
			)}

			{/* Clothing Section */}
			{sectionVisibility.clothing !== false && clothingItems.length > 0 && (
				<div className="container max-w-[90%] mx-auto px-4 py-12">
					<section>
						<h2 className="font-bold text-[clamp(2rem,7vw,8rem)] mb-10 md:mb-16 tracking-tight text-center leading-none">
							{comingSoonText}
						</h2>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
							{clothingItems.map((item, index) => (
								<Image
									key={item.id}
									src={
										item.image_url || `/images/${item.image_filename}`
									}
									alt={item.title || `Clothes ${index + 1}`}
									width={300}
									height={400}
									sizes="(max-width: 768px) 90vw, 30vw"
									className="w-full h-auto object-cover"
									decoding="async"
									loading="lazy"
								/>
							))}
						</div>
					</section>
				</div>
			)}

			{/* Social Links Section */}
			{sectionVisibility.social !== false && (
				<div className="container max-w-[90%] mx-auto px-4 pt-20 pb-16">
					<section>
						<div className="flex flex-col md:flex-row justify-between items-center gap-16 md:gap-12">
							{/* Eye - shows first on mobile, on the right on desktop */}
							<div className="self-center order-1 md:order-2">
								<Eyeball3D />
							</div>

							{/* Social links - shows second on mobile, on the left on desktop */}
							<div className="space-y-8 md:space-y-12 order-2 md:order-1">
								<h2 className="font-extrabold text-[clamp(2rem,7vw,6.25rem)] text-black tracking-tight text-center md:text-left">
									FIND ME AT
								</h2>

								<SocialLinks settings={settings} />
							</div>
						</div>
					</section>
				</div>
			)}
		</main>
	);
}
