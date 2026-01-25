import { behobenPieces, getLocalImageUrl } from "@/lib/behoben-data";
import BehobenGallery from "./BehobenGallery";

export default function BehobenPage() {
	return (
		<>
			{/* Preload first 6 gallery images for instant above-fold rendering */}
			{behobenPieces.slice(0, 6).map((piece) => (
				<link
					key={piece.id}
					rel="preload"
					as="image"
					href={getLocalImageUrl(piece.image_filename)}
				/>
			))}
			<BehobenGallery pieces={behobenPieces} />
		</>
	);
}
