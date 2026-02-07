import { supabaseAdmin } from "@/lib/supabase-admin";
import type { HomepageSection, HomepageItem } from "@/lib/types";
import {
	defaultHomepageSections,
	defaultHomepageItems,
} from "@/lib/fallbacks/homepage";

// Sections
export async function getHomepageSections(): Promise<HomepageSection[]> {
	try {
		const { data, error } = await supabaseAdmin
			.from("homepage_sections")
			.select("*")
			.order("display_order");

		if (error) throw error;
		return data ?? defaultHomepageSections;
	} catch (error) {
		console.error("Failed to fetch homepage sections:", error);
		return defaultHomepageSections;
	}
}

export async function updateHomepageSection(
	id: string,
	updates: Partial<HomepageSection>,
): Promise<HomepageSection | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("homepage_sections")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to update homepage section:", error);
		return null;
	}
}

export async function toggleSectionVisibility(
	sectionKey: string,
	isVisible: boolean,
): Promise<boolean> {
	try {
		const { error } = await supabaseAdmin
			.from("homepage_sections")
			.update({ is_visible: isVisible })
			.eq("section_key", sectionKey);

		if (error) throw error;
		return true;
	} catch (error) {
		console.error("Failed to toggle section visibility:", error);
		return false;
	}
}

// Items
export async function getHomepageItems(
	itemType?: "work" | "clothing",
): Promise<HomepageItem[]> {
	try {
		let query = supabaseAdmin
			.from("homepage_items")
			.select("*")
			.order("display_order");

		if (itemType) {
			query = query.eq("item_type", itemType);
		}

		const { data, error } = await query;

		if (error) throw error;
		return (
			data ??
			(itemType
				? defaultHomepageItems.filter((i) => i.item_type === itemType)
				: defaultHomepageItems)
		);
	} catch (error) {
		console.error("Failed to fetch homepage items:", error);
		return itemType
			? defaultHomepageItems.filter((i) => i.item_type === itemType)
			: defaultHomepageItems;
	}
}

export async function createHomepageItem(
	item: Omit<HomepageItem, "id">,
): Promise<HomepageItem | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("homepage_items")
			.insert(item)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to create homepage item:", error);
		return null;
	}
}

export async function updateHomepageItem(
	id: string,
	updates: Partial<HomepageItem>,
): Promise<HomepageItem | null> {
	try {
		const { data, error } = await supabaseAdmin
			.from("homepage_items")
			.update(updates)
			.eq("id", id)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to update homepage item:", error);
		return null;
	}
}

export async function deleteHomepageItem(id: string): Promise<boolean> {
	try {
		const { error } = await supabaseAdmin
			.from("homepage_items")
			.delete()
			.eq("id", id);

		if (error) throw error;
		return true;
	} catch (error) {
		console.error("Failed to delete homepage item:", error);
		return false;
	}
}

export async function reorderHomepageItems(
	orderedIds: string[],
): Promise<boolean> {
	try {
		for (let i = 0; i < orderedIds.length; i++) {
			const { error } = await supabaseAdmin
				.from("homepage_items")
				.update({ display_order: i + 1 })
				.eq("id", orderedIds[i]);

			if (error) throw error;
		}
		return true;
	} catch (error) {
		console.error("Failed to reorder homepage items:", error);
		return false;
	}
}
