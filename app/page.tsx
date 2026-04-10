import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { fetchBehobenPieces, getImageUrl } from "@/lib/behoben-data";
import { getHomepageData } from "@/lib/public-data";
import LazyEyeball3D from "./components/LazyEyeball3D";
import PageHeader from "./components/PageHeader";
import SocialLinks from "./components/SocialLinks";
import BehobenFooter from "./components/BehobenFooter";

const VideoCarousel = dynamic(() => import("./components/VideoCarousel"), {
	loading: () => (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="aspect-video w-full animate-pulse bg-ink/5" />
			<div className="hidden aspect-video w-full animate-pulse bg-ink/5 md:block" />
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
				<div className="relative w-full overflow-hidden bg-linear-to-b from-transparent to-ink gradient-ease-[cubic-bezier(0.4,0.3,0.5,0.6)] text-white">
					<div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-48 bg-linear-to-t from-white to-transparent gradient-ease-[cubic-bezier(0.5,0.5,0.3,0.89)]" />
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 opacity-[0.2] mix-blend-screen"
						style={{
							backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
							backgroundSize: "220px 220px",
						}}
					/>
					<div className="relative z-10 container mx-auto mt-8 max-w-[90%] px-4 py-52 md:py-28">
						<section className="relative overflow-hidden">
							<div className="relative flex items-center min-h-[48rem] sm:min-h-[54rem] lg:min-h-[44rem]">
								<div className="relative z-20 max-w-2xl space-y-8 text-white/80">
									<div className="space-y-3">
										<h3 className="font-bold text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-[-0.06em] uppercase z-999">
											Behoben
										</h3>
									</div>

									<p className="max-w-xl pl-4 text-[clamp(1rem,1.8vw,1.125rem)] leading-relaxed text-paper/72">
										Most recent collection of works. A mixture of various
										mediums, all tied together by expression and a desire to
										create.
									</p>

									<Link
										href="/works/behoben"
										className="inline-flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-paper"
									>
										View the full Behoben works
										<span aria-hidden="true">{"->"}</span>
									</Link>
								</div>

								{/* {heroBehobenPieces.length >= 3 && (
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
														className="block h-auto w-full border border-paper/10 opacity-95 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
													/>
												</div>
											);
										})}
									</div>
								)} */}
							</div>
						</section>
					</div>
				</div>
			)}

			<div className="w-full">
				<div className="container mx-auto max-w-[90%] px-4 py-16 md:py-20">
					<section>
						<div className="mb-10 max-w-3xl space-y-4 md:mb-12">
							<h2 className="font-bold text-[clamp(2rem,4vw,5rem)] tracking-tight text-center md:text-left text-ink uppercase">
								Video works
							</h2>
							<p className="max-w-2xl text-base leading-relaxed text-ink/70">
								A quieter run through the work in motion, kept direct and
								editorial.
							</p>
						</div>
						<VideoCarousel videos={featuredVideoSeeds} />
					</section>
				</div>
			</div>

			{sectionVisibility.clothing !== false && clothingItems.length > 0 && (
				<div className="w-full text-ink">
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
				<div className="w-full">
					<BehobenFooter settings={settings} />
				</div>
			)}
		</main>
	);
}
