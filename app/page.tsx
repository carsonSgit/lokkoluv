import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { fetchBehobenPieces, getImageUrl } from "@/lib/behoben-data";
import { getHomepageData } from "@/lib/public-data";
import LazyEyeball3D from "./components/LazyEyeball3D";
import PageHeader from "./components/PageHeader";
import SocialLinks from "./components/SocialLinks";

const VideoCarousel = dynamic(() => import("./components/VideoCarousel"), {
	loading: () => (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="aspect-video w-full animate-pulse bg-black/5" />
			<div className="hidden aspect-video w-full animate-pulse bg-black/5 md:block" />
		</div>
	),
});

const featuredVideoSeeds = [
	{ id: "v1", youtubeId: "Nqq2EG53-p4", title: "about us2.29- 2024" },
	{
		id: "v2",
		youtubeId: "2BvXiX9VfwQ",
		title:
			"LOKKOLUV - INSANITY Thru My Aching {take 1}  FEAT.  48kHURTZ (Official Music Video)",
	},
	{
		id: "v3",
		youtubeId: "PuAAxd_aIJ8",
		title: "save thy creative mind----2024",
	},
	{ id: "v4", youtubeId: "NZTkXCGT2Pc", title: "Piece of Mind, 2024" },
	{ id: "v5", youtubeId: "5ishw3KWW7w", title: "THE BLAKKEST REBEL" },
	{ id: "v6", youtubeId: "L_FGmJh7Eco", title: "TRULY F=KN GRATEFUL" },
];

const behobenHeroImageDimensions: Record<
	number,
	{ width: number; height: number }
> = {
	1: { width: 1920, height: 1898 },
	2: { width: 1920, height: 1939 },
	3: { width: 1920, height: 2370 },
};

export const revalidate = 300;

export default async function Home() {
	const [
		{ sectionVisibility, clothingItems, content, settings },
		behobenPieces,
	] = await Promise.all([getHomepageData(), fetchBehobenPieces()]);

	const comingSoonText = content.coming_soon_text || "never stop making";
	const heroBehobenPieces = behobenPieces.slice(0, 3);

	return (
		<main className="w-full">
			<PageHeader />

			{sectionVisibility.works !== false && (
				<div className="relative w-full overflow-hidden bg-black text-white">
					<div className="relative z-10 container mx-auto mt-8 max-w-[90%] px-4 py-32 md:py-18">
						<section className="relative overflow-hidden">
							<div
								aria-hidden="true"
								className="pointer-events-none absolute top-2 text-[clamp(5rem,16vw,15rem)] font-bold uppercase leading-none tracking-[-0.08em] text-white/[0.06]"
							>
								BEHOBEN
							</div>

							<div className="relative min-h-[32rem] pt-10 sm:min-h-[36rem] lg:min-h-[29rem]">
								<div className="relative z-20 max-w-2xl space-y-8">
									<div className="space-y-3">
										<h3 className="font-bold text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-[-0.06em] uppercase z-999">
											Behoben
										</h3>
									</div>

									<p className="max-w-xl pl-4 text-[clamp(1rem,1.8vw,1.125rem)] leading-relaxed text-white/72">
										Most recent collection of works. A mixture of various
										mediums, all tied together by expression and a desire to
										create.
									</p>

									<Link
										href="/works/behoben"
										className="inline-flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-white"
									>
										View the full Behoben works
										<span aria-hidden="true">{"->"}</span>
									</Link>
								</div>

								{heroBehobenPieces.length >= 3 && (
									<div className="pointer-events-none absolute inset-0 z-10">
										{heroBehobenPieces.map((piece, index) => {
											const dimensions = behobenHeroImageDimensions[
												piece.piece_number
											] ?? {
												width: 1920,
												height: 1920,
											};

											const layoutClasses = [
												"absolute left-[12%] top-[40%] z-10 w-[48%] sm:left-[26%] sm:top-[30%] sm:w-[32%] lg:left-[56%] lg:top-[8%] lg:w-[18%]",
												"absolute right-[16%] top-[18%] z-30 w-[36%] sm:right-[27%] sm:top-[13%] sm:w-[23%] lg:right-[8%] lg:top-0 lg:w-[16%]",
												"absolute bottom-[10%] right-[26%] z-20 w-[44%] sm:bottom-[12%] sm:right-[32%] sm:w-[29%] lg:bottom-[2%] lg:right-[16%] lg:w-[19%]",
											];

											return (
												<div key={piece.id} className={layoutClasses[index]}>
													<Image
														src={getImageUrl(piece)}
														alt={piece.title}
														width={dimensions.width}
														height={dimensions.height}
														priority={index < 2}
														sizes="(max-width: 640px) 58vw, (max-width: 1024px) 34vw, 26vw"
														className="block h-auto w-full border border-white/10 opacity-95 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
													/>
												</div>
											);
										})}
									</div>
								)}
							</div>
						</section>
					</div>
				</div>
			)}

			<div className="w-full bg-white">
				<div className="container mx-auto max-w-[90%] px-4 py-16 md:py-20">
					<section>
						<div className="mb-10 max-w-3xl space-y-4 md:mb-12">
							<h2 className="font-bold text-[clamp(2rem,4vw,5rem)] tracking-tight text-center md:text-left text-black uppercase">
								Video works
							</h2>
							<p className="max-w-2xl text-base leading-relaxed text-black/70">
								A quieter run through the work in motion, kept direct and
								editorial.
							</p>
						</div>
						<VideoCarousel videos={featuredVideoSeeds} />
					</section>
				</div>
			</div>

			{sectionVisibility.clothing !== false && clothingItems.length > 0 && (
				<div className="w-full bg-black text-white">
					<div className="container mx-auto max-w-[90%] px-4 py-14 md:py-18">
						<section>
							<h2 className="mb-10 text-center font-bold text-[clamp(2rem,7vw,8rem)] leading-none tracking-tight md:mb-16">
								{comingSoonText}
							</h2>

							<div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
								{clothingItems.map((item, index) => (
									<Image
										key={item.id}
										src={item.image_url || `/images/${item.image_filename}`}
										alt={item.title || `Clothes ${index + 1}`}
										width={300}
										height={400}
										sizes="(max-width: 768px) 90vw, 30vw"
										className="h-auto w-full object-cover"
										decoding="async"
										loading="lazy"
									/>
								))}
							</div>
						</section>
					</div>
				</div>
			)}

			{sectionVisibility.social !== false && (
				<div className="w-full bg-white">
					<div className="container mx-auto max-w-[90%] px-4 pb-16 pt-20 md:pb-18 md:pt-24">
						<section>
							<div className="flex flex-col items-center justify-between gap-16 md:flex-row md:gap-12">
								<div className="order-1 self-center md:order-2">
									<LazyEyeball3D />
								</div>

								<div className="order-2 space-y-8 md:order-1 md:space-y-12">
									<h2 className="text-center font-extrabold text-[clamp(2rem,7vw,6.25rem)] tracking-tight text-black md:text-left">
										FIND ME AT
									</h2>

									<SocialLinks settings={settings} />
								</div>
							</div>
						</section>
					</div>
				</div>
			)}
		</main>
	);
}
