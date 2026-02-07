import { fetchBehobenPieces, getImageUrl } from "@/lib/behoben-data";
import { getPublicSiteSettings } from "@/lib/public-data";
import BehobenGallery from "./BehobenGallery";

export default async function BehobenPage() {
	const [pieces, settings] = await Promise.all([
		fetchBehobenPieces(),
		getPublicSiteSettings(),
	]);

	return (
		<>
			{/* Preload first 6 gallery images for instant above-fold rendering */}
			{pieces.slice(0, 6).map((piece) => (
				<link
					key={piece.id}
					rel="preload"
					as="image"
					href={getImageUrl(piece)}
				/>
			))}
			<BehobenGallery pieces={pieces} settings={settings} />
		</>
	);
}
