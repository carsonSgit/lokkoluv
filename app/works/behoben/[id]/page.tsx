import { notFound } from "next/navigation";
import { fetchBehobenPieceByNumber } from "@/lib/behoben-data";
import { getPublicSiteSettings } from "@/lib/public-data";
import PieceDetails from "./PieceDetails";

export const revalidate = 60; // Revalidate every minute

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function BehobenPiecePage({ params }: PageProps) {
	const resolvedParams = await params;
	const pieceNumber = parseInt(resolvedParams.id, 10);

	if (isNaN(pieceNumber)) {
		notFound();
	}

	const [piece, settings] = await Promise.all([
		fetchBehobenPieceByNumber(pieceNumber),
		getPublicSiteSettings(),
	]);

	if (!piece) {
		notFound();
	}

	return <PieceDetails piece={piece} settings={settings} />;
}
