import { defaultSettings } from "@/lib/fallbacks/settings";
import type { SiteSettings } from "@/lib/types";
import LazyEyeball3D from "./LazyEyeball3D";
import SocialLinks from "./SocialLinks";

interface BehobenFooterProps {
	settings?: SiteSettings;
}

export default function BehobenFooter({
	settings = defaultSettings,
}: BehobenFooterProps) {
	return (
		<div className="container max-w-[90%] mx-auto px-4 pt-32">
			<section className="pb-10">
				<div className="flex flex-col md:flex-row justify-between items-center gap-12">
					<div className="self-center order-1 md:order-2">
						<LazyEyeball3D />
					</div>

					<div className="space-y-8 md:space-y-12 order-2 md:order-1">
						<h2 className="font-bold text-[clamp(1.25rem,2.5vw,2rem)] text-black tracking-[0.2em] uppercase text-center md:text-left">
							Find me at
						</h2>

						<SocialLinks settings={settings} />
					</div>
				</div>
			</section>
		</div>
	);
}
