import BehobenFooter from "@/app/components/BehobenFooter";

export default function AboutPage() {
	return (
		<main className="w-full min-h-screen">
			{/* Header */}
			<header className="pt-16 text-center">
				<h1 className="font-extrabold text-[clamp(3rem,10vw,9rem)] text-black">
					LOKKOLUV
				</h1>
				<h2 className="font-medium text-[clamp(1.875rem,4.5vw,3rem)] tracking-[0.3em] text-black mt-2">
					ABOUT
				</h2>
			</header>

			{/* Story Content */}
			<div className="container max-w-[90%] mx-auto px-4 py-12">
				<article className="max-w-3xl mx-auto">
					<div className="space-y-8 text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-black">
						<p className="font-bold text-[clamp(1.125rem,2.5vw,1.5rem)]">
							My story is a roller coaster of color and creativity built on a
							foundation of turmoil.
						</p>

						<p>
							I grew up in LaSalle, a neighborhood teeming with energy that
							could easily ignite a young mind. While I spent my days playing
							sports and navigating a French school system, I felt a constant
							friction between the classroom and my home life.{" "}
							<strong>
								Coming from a background of Jamaican and Vincentian Patois, the
								language barrier in a French environment created a divide that
								was difficult to bridge.
							</strong>
						</p>

						<p>
							Because of this, my true language was always art. I was constantly
							sketching and building small worlds out of scraps found in the
							basement apartment I shared with my mother. That world shifted
							forever just before my ninth birthday when my mother was
							wrongfully deported. What followed was a blur of bouncing from
							home to home and &apos;hood to &apos;hood. I eventually settled
							with my grandmother; she had recently retired and, instead of
							returning to Jamaica for the tranquility she&apos;d earned, she
							chose to stay and take on the weight of raising me.
						</p>

						<p className="font-bold text-[clamp(1.125rem,2.5vw,1.5rem)]">
							The events I&apos;ve survived have wired my brain and shaped my
							hands. My work is a direct reflection of that history—a blend of
							Neo-Expressionism and fine-art graffiti born from the
							&apos;in-between.&apos; I don&apos;t just paint; I document a life
							lived in the crosshairs of systemic disaster and creative
							survival. This is my life: unfiltered, unapologetic, and loud.
						</p>

						{/* Article Link Button */}
						<div className="pt-8 flex justify-center">
							<a
								href="https://www.ctvnews.ca/montreal/article/mother-pleads-for-stay-of-deportation-to-care-for-ailing-son/"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-8 py-3 border-2 border-black text-black text-sm tracking-[0.2em] font-bold uppercase hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none transition-colors cursor-pointer"
							>
								My Story
							</a>
						</div>
					</div>
				</article>
			</div>

			{/* Footer */}
			<BehobenFooter />
		</main>
	);
}
