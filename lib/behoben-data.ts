import { supabase } from "./supabase";
import type { BehobenPiece } from "./types";

// Local behoben pieces data - fallback if Supabase fetch fails
export const behobenPieces: BehobenPiece[] = [
	{
		id: "1",
		piece_number: 1,
		title: "BEHOBEN I",
		year: 2024,
		image_filename: "behoben_1.webp",
		display_order: 1,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "2",
		piece_number: 2,
		title: "BEHOBEN II",
		year: 2024,
		image_filename: "behoben_2.webp",
		display_order: 2,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "3",
		piece_number: 3,
		title: "BEHOBEN III",
		year: 2024,
		image_filename: "behoben_3.webp",
		display_order: 3,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "4",
		piece_number: 4,
		title: "BEHOBEN IV",
		year: 2024,
		image_filename: "behoben_4.webp",
		display_order: 4,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "5",
		piece_number: 5,
		title: "BEHOBEN V",
		year: 2024,
		image_filename: "behoben_5.webp",
		display_order: 5,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "6",
		piece_number: 6,
		title: "BEHOBEN VI",
		year: 2024,
		image_filename: "behoben_6.webp",
		display_order: 6,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "7",
		piece_number: 7,
		title: "BEHOBEN VII",
		year: 2024,
		image_filename: "behoben_7.webp",
		display_order: 7,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "8",
		piece_number: 8,
		title: "BEHOBEN VIII",
		year: 2024,
		image_filename: "behoben_8.webp",
		display_order: 8,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "9",
		piece_number: 9,
		title: "BEHOBEN IX",
		year: 2024,
		image_filename: "behoben_9.webp",
		display_order: 9,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "10",
		piece_number: 10,
		title: "BEHOBEN X",
		year: 2024,
		image_filename: "behoben_10.webp",
		display_order: 10,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "11",
		piece_number: 11,
		title: "BEHOBEN XI",
		year: 2024,
		image_filename: "behoben_11.webp",
		display_order: 11,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "12",
		piece_number: 12,
		title: "BEHOBEN XII",
		year: 2024,
		image_filename: "behoben_12.webp",
		display_order: 12,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
	{
		id: "13",
		piece_number: 13,
		title: "BEHOBEN XIII",
		year: 2024,
		image_filename: "behoben_13.webp",
		display_order: 13,
		size: null,
		mediums: null,
		techniques: null,
		surface: null,
	},
];

// Fetch behoben pieces from Supabase with local fallback
export async function fetchBehobenPieces(): Promise<BehobenPiece[]> {
	// Return local data if Supabase is not configured
	if (!supabase) {
		return behobenPieces;
	}

	try {
		const { data, error } = await supabase
			.from("behoben_pieces")
			.select("*")
			.lte("piece_number", 13)
			.order("display_order", { ascending: true });

		if (error) {
			console.error("Supabase fetch error:", error);
			return behobenPieces;
		}

		return data ?? behobenPieces;
	} catch (error) {
		console.error("Failed to fetch from Supabase:", error);
		return behobenPieces;
	}
}

// Get local image path - no external API calls
export function getLocalImageUrl(filename: string): string {
	return `/images/behoben/${filename}`;
}

// Get image URL - supports both local and Storage URLs
export function getImageUrl(piece: BehobenPiece): string {
	// Check if piece has a Storage URL (admin-uploaded)
	const adminPiece = piece as BehobenPiece & { image_url?: string | null };
	if (adminPiece.image_url) {
		return adminPiece.image_url;
	}
	// Fall back to local image
	return getLocalImageUrl(piece.image_filename);
}
