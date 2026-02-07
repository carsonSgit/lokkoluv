import { fetchBehobenPieces, getLocalImageUrl } from "@/lib/behoben-data";
import BehobenGallery from "./BehobenGallery";

export default async function BehobenPage() {
	const pieces = await fetchBehobenPieces();

	return (
		<>
			{/* Preload first 6 gallery images for instant above-fold rendering */}
			{pieces.slice(0, 6).map((piece) => (
				<link
					key={piece.id}
					rel="preload"
					as="image"
					href={getLocalImageUrl(piece.image_filename)}
				/>
			))}
			<BehobenGallery pieces={pieces} />
		</>
	);
}
