import type { SiteSettings } from "@/lib/types";

interface SocialLinksProps {
	settings: SiteSettings;
}

export default function SocialLinks({ settings }: SocialLinksProps) {
	return (
		<div className="flex flex-row md:flex-col gap-6 md:gap-4 justify-center md:justify-start">
			{settings.instagram_url && (
				<a
					href={settings.instagram_url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-5 group cursor-pointer min-h-[44px] transition-colors"
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
							<path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
						</svg>
					</div>
					<span className="hidden md:inline text-3xl tracking-[2.16px] text-black group-hover:underline underline-offset-4">
						INSTAGRAM
					</span>
				</a>
			)}

			{settings.tiktok_url && (
				<a
					href={settings.tiktok_url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-5 group cursor-pointer min-h-[44px] transition-colors"
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
							<path d="M224,72a48.05,48.05,0,0,1-48-48,8,8,0,0,0-8-8H128a8,8,0,0,0-8,8V156a20,20,0,1,1-28.57-18.08A8,8,0,0,0,96,130.69V88a8,8,0,0,0-9.4-7.88C50.91,86.48,24,119.1,24,156a76,76,0,0,0,152,0V116.29A103.25,103.25,0,0,0,224,128a8,8,0,0,0,8-8V80A8,8,0,0,0,224,72Zm-8,39.64a87.19,87.19,0,0,1-43.33-16.15A8,8,0,0,0,160,102v54a60,60,0,0,1-120,0c0-25.9,16.64-49.13,40-57.6v27.67A36,36,0,1,0,136,156V32h24.5A64.14,64.14,0,0,0,216,87.5Z" />
						</svg>
					</div>
					<span className="hidden md:inline text-3xl tracking-[2.16px] text-black group-hover:underline underline-offset-4">
						TIKTOK
					</span>
				</a>
			)}
		</div>
	);
}
