import { supabaseAdmin } from "@/lib/supabase-admin";
import type { ContentBlock } from "@/lib/types";
import {
	defaultContentBlocks,
	getDefaultContentBlock,
} from "@/lib/fallbacks/content";

export async function getContentBlocks(): Promise<ContentBlock[]> {
	try {
		const { data, error } = await supabaseAdmin
			.from("content_blocks")
			.select("*")
			.order("block_key");

		if (error) throw error;
		return data ?? defaultContentBlocks;
	} catch (error) {
		console.error("Failed to fetch content blocks:", error);
		return defaultContentBlocks;
	}
}

export async function getContentBlock(key: string): Promise<ContentBlock | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("content_blocks")
			.select("*")
			.eq("block_key", key)
			.single();

		if (error) {
			// Return default if not found
			return getDefaultContentBlock(key) ?? null;
		}
		return data;
	} catch (error) {
		console.error("Failed to fetch content block:", error);
		return getDefaultContentBlock(key) ?? null;
	}
}

export async function updateContentBlock(
	id: string,
	updates: Partial<ContentBlock>,
): Promise<ContentBlock | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("content_blocks")
			.update({ ...updates, updated_at: new Date().toISOString() })
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to update content block:", error);
		return null;
	}
}

export async function upsertContentBlock(
	block: Omit<ContentBlock, "updated_at">,
): Promise<ContentBlock | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("content_blocks")
			.upsert(
				{ ...block, updated_at: new Date().toISOString() },
				{ onConflict: "block_key" },
			)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to upsert content block:", error);
		return null;
	}
}
