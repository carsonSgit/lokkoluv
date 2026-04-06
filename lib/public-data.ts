import {
	defaultContentBlocks,
	getDefaultContentBlock,
} from "./fallbacks/content";
import {
	defaultHomepageItems,
	defaultHomepageSections,
} from "./fallbacks/homepage";
import { defaultSettings } from "./fallbacks/settings";
import { defaultTheme } from "./fallbacks/theme";
import { supabase } from "./supabase";
import type {
	ContentBlock,
	HomepageItem,
	HomepageSection,
	SiteSettings,
	ThemeSettings,
} from "./types";

// ============================================
// Content Blocks (about, banner, etc.)
// ============================================

export async function getPublicContentBlocks(): Promise<ContentBlock[]> {
	if (!supabase) return defaultContentBlocks;

	try {
		const { data, error } = await supabase
			.from("content_blocks")
			.select("*")
			.eq("is_visible", true)
			.order("block_key");

		if (error) throw error;
		return data && data.length > 0 ? data : defaultContentBlocks;
	} catch (error) {
		console.error("Failed to fetch public content blocks:", error);
		return defaultContentBlocks;
	}
}

export async function getPublicContentBlock(
	key: string,
): Promise<ContentBlock | null> {
	if (!supabase) return getDefaultContentBlock(key) ?? null;

	try {
		const { data, error } = await supabase
			.from("content_blocks")
			.select("*")
			.eq("block_key", key)
			.eq("is_visible", true)
			.single();

		if (error) return getDefaultContentBlock(key) ?? null;
		return data;
	} catch {
		return getDefaultContentBlock(key) ?? null;
	}
}

// ============================================
// Homepage Sections & Items
// ============================================

export async function getPublicHomepageSections(): Promise<HomepageSection[]> {
	if (!supabase) return defaultHomepageSections;

	try {
		const { data, error } = await supabase
			.from("homepage_sections")
			.select("*")
			.order("display_order");

		if (error) throw error;
		return data && data.length > 0 ? data : defaultHomepageSections;
	} catch (error) {
		console.error("Failed to fetch homepage sections:", error);
		return defaultHomepageSections;
	}
}

export async function getPublicHomepageItems(
	itemType?: "work" | "clothing",
): Promise<HomepageItem[]> {
	if (!supabase) {
		const items = itemType
			? defaultHomepageItems.filter((i) => i.item_type === itemType)
			: defaultHomepageItems;
		return items.filter((i) => i.is_visible);
	}

	try {
		let query = supabase
			.from("homepage_items")
			.select("*")
			.eq("is_visible", true)
			.order("display_order");

		if (itemType) {
			query = query.eq("item_type", itemType);
		}

		const { data, error } = await query;

		if (error) throw error;
		if (data && data.length > 0) return data;

		const fallback = itemType
			? defaultHomepageItems.filter((i) => i.item_type === itemType)
			: defaultHomepageItems;
		return fallback.filter((i) => i.is_visible);
	} catch (error) {
		console.error("Failed to fetch homepage items:", error);
		const fallback = itemType
			? defaultHomepageItems.filter((i) => i.item_type === itemType)
			: defaultHomepageItems;
		return fallback.filter((i) => i.is_visible);
	}
}

// ============================================
// Site Settings
// ============================================

export async function getPublicSiteSettings(): Promise<SiteSettings> {
	if (!supabase) return defaultSettings;

	try {
		const { data, error } = await supabase
			.from("site_settings")
			.select("*")
			.limit(1)
			.single();

		if (error) throw error;
		return data ?? defaultSettings;
	} catch (error) {
		console.error("Failed to fetch site settings:", error);
		return defaultSettings;
	}
}

// ============================================
// Theme Settings (published only)
// ============================================

export async function getPublicTheme(): Promise<ThemeSettings> {
	if (!supabase) return defaultTheme;

	try {
		const { data, error } = await supabase
			.from("theme_settings")
			.select("*")
			.eq("is_published", true)
			.limit(1)
			.single();

		if (error) throw error;
		return data ?? defaultTheme;
	} catch (error) {
		console.error("Failed to fetch published theme:", error);
		return defaultTheme;
	}
}

// ============================================
// Convenience: Fetch all homepage data at once
// ============================================

export async function getHomepageData() {
	const [sections, workItems, clothingItems, contentBlocks, settings] =
		await Promise.all([
			getPublicHomepageSections(),
			getPublicHomepageItems("work"),
			getPublicHomepageItems("clothing"),
			getPublicContentBlocks(),
			getPublicSiteSettings(),
		]);

	// Build a map for quick section visibility lookup
	const sectionVisibility: Record<string, boolean> = {};
	for (const section of sections) {
		sectionVisibility[section.section_key] = section.is_visible;
	}

	// Build a map for quick content lookup
	const content: Record<string, string> = {};
	for (const block of contentBlocks) {
		content[block.block_key] = block.content;
	}

	return {
		sections,
		sectionVisibility,
		workItems,
		clothingItems,
		contentBlocks,
		content,
		settings,
	};
}
