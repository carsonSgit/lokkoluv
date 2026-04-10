import { defaultSettings } from "@/lib/fallbacks/settings";
import type { SiteSettings } from "@/lib/types";

interface SocialLinksProps {
	settings: SiteSettings;
}

export default function SocialLinks({ settings }: SocialLinksProps) {
	const youtubeUrl = settings.youtube_url || defaultSettings.youtube_url;

	return (
		<div className="flex flex-row justify-center gap-6 md:flex-col md:justify-start md:gap-4">
			{settings.instagram_url && (
				<a
					href={settings.instagram_url}
					target="_blank"
					rel="noopener noreferrer"
					className="group flex min-h-[44px] cursor-pointer items-center gap-5 transition-colors"
				>
					<div className="flex h-[48px] w-[50px] items-center justify-center">
						<svg
							role="img"
							aria-label="Instagram Icon"
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="#000000"
							viewBox="0 0 256 256"
						>
							<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
						</svg>
					</div>
					<span className="hidden text-sm font-semibold tracking-[0.2em] text-black underline-offset-4 group-hover:underline md:inline">
						INSTAGRAM
					</span>
				</a>
			)}

			{youtubeUrl && (
				<a
					href={youtubeUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="group flex min-h-[44px] cursor-pointer items-center gap-5 transition-colors"
				>
					<div className="flex h-[48px] w-[50px] items-center justify-center">
						<svg
							role="img"
							aria-label="YouTube Icon"
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							fill="#000000"
							viewBox="0 0 256 256"
						>
							<path d="M234.33,69.52a24,24,0,0,0-14.49-16.4C185.56,40,128,40,128,40S70.44,40,36.16,53.12A24,24,0,0,0,21.67,69.52,240,240,0,0,0,16,128a240,240,0,0,0,5.67,58.48,24,24,0,0,0,14.49,16.41C70.44,216,128,216,128,216s57.56,0,91.84-13.11a24,24,0,0,0,14.49-16.41A240,240,0,0,0,240,128,240,240,0,0,0,234.33,69.52Zm-72.51,61.44-48,32A4,4,0,0,1,108,160V96a4,4,0,0,1,6.06-3.44l48,32a4,4,0,0,1,0,6.88Z" />
						</svg>
					</div>
					<span className="hidden text-sm font-semibold tracking-[0.2em] text-black underline-offset-4 group-hover:underline md:inline">
						YOUTUBE
					</span>
				</a>
			)}
		</div>
	);
}
