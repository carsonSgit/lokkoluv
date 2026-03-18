import { behobenPieces } from "@/lib/behoben-data";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { BehobenPieceAdmin } from "@/lib/types";

export async function getGalleryPieces(): Promise<BehobenPieceAdmin[]> {
	try {
		const { data, error } = await supabaseAdmin
			.from("behoben_pieces")
			.select("*")
			.order("display_order", { ascending: true });

		if (error) throw error;
		return data ?? behobenPieces;
	} catch (error) {
		console.error("Failed to fetch gallery pieces:", error);
		return behobenPieces;
	}
}

export async function getGalleryPiece(
	id: string,
): Promise<BehobenPieceAdmin | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("behoben_pieces")
			.select("*")
			.eq("id", id)
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to fetch gallery piece:", error);
		return null;
	}
}

export async function createGalleryPiece(
	piece: Omit<BehobenPieceAdmin, "id" | "created_at" | "updated_at">,
): Promise<BehobenPieceAdmin | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("behoben_pieces")
			.insert(piece)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to create gallery piece:", error);
		return null;
	}
}

export async function updateGalleryPiece(
	id: string,
	updates: Partial<BehobenPieceAdmin>,
): Promise<BehobenPieceAdmin | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("behoben_pieces")
			.update({ ...updates, updated_at: new Date().toISOString() })
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to update gallery piece:", error);
		return null;
	}
}

export async function deleteGalleryPiece(id: string): Promise<boolean> {
	try {
		const { error } = await supabaseAdmin
			.from("behoben_pieces")
			.delete()
			.eq("id", id);

		if (error) throw error;
		return true;
	} catch (error) {
		console.error("Failed to delete gallery piece:", error);
		return false;
	}
}

export async function reorderGalleryPieces(
	orderedIds: string[],
): Promise<boolean> {
	try {
		const updates = orderedIds.map((id, index) => ({
			id,
			display_order: index + 1,
		}));

		for (const update of updates) {
			const { error } = await supabaseAdmin
				.from("behoben_pieces")
				.update({ display_order: update.display_order })
				.eq("id", update.id);

			if (error) throw error;
		}

		return true;
	} catch (error) {
		console.error("Failed to reorder gallery pieces:", error);
		return false;
	}
}

export async function uploadImage(
	file: File,
	path: string,
): Promise<string | null> {
	try {
		const { data, error } = await supabaseAdmin.storage
			.from("gallery-images")
			.upload(path, file, {
				cacheControl: "3600",
				upsert: true,
			});

		if (error) throw error;

		const {
			data: { publicUrl },
		} = supabaseAdmin.storage.from("gallery-images").getPublicUrl(data.path);

		return publicUrl;
	} catch (error) {
		console.error("Failed to upload image:", error);
		return null;
	}
}

export async function deleteImage(path: string): Promise<boolean> {
	try {
		const { error } = await supabaseAdmin.storage
			.from("gallery-images")
			.remove([path]);

		if (error) throw error;
		return true;
	} catch (error) {
		console.error("Failed to delete image:", error);
		return false;
	}
}
