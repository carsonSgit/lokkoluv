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
						<h2 className="font-extrabold text-[clamp(2rem,7vw,6.25rem)] text-black tracking-tight text-center md:text-left">
							FIND ME AT
						</h2>

						<SocialLinks settings={settings} />
					</div>
				</div>
			</section>
		</div>
	);
}
