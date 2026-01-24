import { supabase } from "@/lib/supabase";
import type { BehobenPiece } from "@/lib/types";
import BehobenGallery from "./BehobenGallery";

async function getPieces(): Promise<BehobenPiece[]> {
	const { data, error } = await supabase
		.from("behoben_pieces")
		.select("*")
		.order("display_order", { ascending: true });

	if (error) {
		console.error("Error fetching pieces:", error);
		return [];
	}

	return data || [];
}

export default async function BehobenPage() {
	const pieces = await getPieces();

	return <BehobenGallery pieces={pieces} />;
}
