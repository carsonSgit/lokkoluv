import Image from "next/image";
import Eyeball3D from "./threejs/Eyeball3D";
import dynamic from "next/dynamic";



export default function Home() {
	return (
		<main className="w-full">
			<header className="pt-16 text-center">
				<h1 className="font-extrabold text-[clamp(3rem,10vw,9rem)] text-black">
					LOKKOLUV
				</h1>
			</header>

			<div className="container max-w-[90%] mx-auto px-4">
				<section className="mt-12">
					<div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-20">
						<div className="space-y-3">
							<Image
								src="/images/work1.webp"
								alt="Work 1"
								width={200}
								height={200}
								priority
                                sizes="400px"
								className="w-full h-auto object-cover"
                                decoding="sync"
							/>
							<h3 className="font-medium text-[clamp(1.25rem,2vw,1.5rem)] text-black">
								Title
							</h3>
						</div>

						<div className="space-y-3">
							<Image
								src="/images/work2.webp"
								alt="Work 2"
								width={200}
								height={200}
								priority
								sizes="400px"
								className="w-full h-auto object-cover"
								decoding="sync"
							/>
							<h3 className="font-medium text-[clamp(1.25rem,2vw,1.5rem)] text-black">
								Title
							</h3>
						</div>

						<div className="space-y-3">
							<Image
								src="/images/work3.webp"
								alt="Work 3"
								width={200}
								height={200}
								sizes="400px"
								className="w-full h-auto object-cover"
								loading="lazy"
								decoding="sync"
							/>
							<h3 className="font-medium text-[clamp(1.25rem,2vw,1.5rem)] text-black">
								Title
							</h3>
						</div>

						<div className="space-y-3">
							<Image
								src="/images/work4.webp"
								alt="Work 4"
								width={200}
								height={200}
								sizes="400px"
								className="w-full h-auto object-cover"
								loading="lazy"
								decoding="sync"
							/>
							<h3 className="font-medium text-[clamp(1.25rem,2vw,1.5rem)] text-black">
								Title
							</h3>
						</div>
					</div>
				</section>
			</div>

			<div className="w-full">
				<section className="mt-16 bg-[#1e1e1e] py-12 ">
					<div className="relative h-auto flex flex-col justify-center space-y-8 md:space-y-12">
						{[...Array(7)].map((_, i) => (
							<p
								key={`sinner-text-${i}`}
								className="text-white text-[clamp(1.5rem,4vw,3rem)] tracking-[clamp(10px,3vw,40px)] text-center"
							>
								WE ARE ALL SINNERS
							</p>
						))}
					</div>
				</section>
			</div>

			<div className="container max-w-[90%] mx-auto px-4">
				<section className="mt-16">
					<h2 className="font-extrabold text-[clamp(2rem,8vw,7.5rem)] text-black mb-12 tracking-tight text-center">
						7 SINS COMING SOON
					</h2>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Image
							src="/images/clothes1.webp"
							alt="Clothes 1"
							width={300}
                            height={400}
							className="w-full h-auto object-cover"
							decoding="sync"
							loading="lazy"
						/>
						<Image
							src="/images/clothes2.webp"
							alt="Clothes 2"
							width={300}
							height={400}
							className="w-full h-auto object-cover"
							decoding="sync"
							loading="lazy"
						/>
						<Image
							src="/images/clothes3.webp"
							alt="Clothes 3"
							width={300}
							height={400}
							className="w-full h-auto object-cover"
							decoding="sync"
							loading="lazy"
						/>
					</div>
				</section>
			</div>

			<div className="container max-w-[90%] mx-auto px-4 pt-32">
				<section className="pb-10">
					<div className="flex flex-col md:flex-row justify-between items-center gap-12">
						{/* Eye - shows first on mobile, on the right on desktop */}
						<div className="self-center order-1 md:order-2">
							<Eyeball3D />
						</div>

						{/* Social links - shows second on mobile, on the left on desktop */}
						<div className="space-y-8 md:space-y-12 order-2 md:order-1">
							<h2 className="font-extrabold text-[clamp(2rem,7vw,6.25rem)] text-black tracking-tight text-center md:text-left">
								FIND ME AT
							</h2>

							<div className="flex flex-row md:flex-col gap-6 md:gap-4 justify-center md:justify-start">
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-5 group hover:opacity-70 transition-opacity"
								>
									<div className="w-[50px] h-[48px] flex items-center justify-center">
										<svg
											role="img"
											aria-label="Instagram Icon"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											fill="#000000"
											viewBox="0 0 256 256"
										>
											<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
										</svg>
									</div>
									<span className="hidden md:inline text-[clamp(1.5rem,3vw,2.25rem)] tracking-[2.16px] text-black">
										INSTAGRAM
									</span>
								</a>

								<a
									href="https://tiktok.com"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-5 group hover:opacity-70 transition-opacity"
								>
									<div className="w-[50px] h-[48px] flex items-center justify-center">
										<svg
											role="img"
											aria-label="TikTok Icon"
											xmlns="http://www.w3.org/2000/svg"
											width="32"
											height="32"
											fill="#000000"
											viewBox="0 0 256 256"
										>
											<path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z"></path>
										</svg>
									</div>
									<span className="hidden md:inline text-[clamp(1.5rem,3vw,2.25rem)] tracking-[2.16px] text-black">
										TIKTOK
									</span>
								</a>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
