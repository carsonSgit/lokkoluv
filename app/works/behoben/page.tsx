import { fetchBehobenPieces } from "@/lib/behoben-data";
import { getPublicSiteSettings } from "@/lib/public-data";
import BehobenGallery from "./BehobenGallery";

export const revalidate = 300;

export default async function BehobenPage() {
	const [pieces, settings] = await Promise.all([
		fetchBehobenPieces(),
		getPublicSiteSettings(),
	]);

	return <BehobenGallery pieces={pieces} settings={settings} />;
}
