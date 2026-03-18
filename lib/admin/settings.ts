import { defaultSettings } from "@/lib/fallbacks/settings";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type { SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
	try {
		const { data, error } = await supabaseAdmin
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

export async function updateSiteSettings(
	updates: Partial<SiteSettings>,
): Promise<SiteSettings | null> {
	try {
		// First try to get existing settings
		const { data: existing } = await supabaseAdmin
			.from("site_settings")
			.select("id")
			.limit(1)
			.single();

		if (existing) {
			// Update existing
			const { data, error } = await supabaseAdmin
				.from("site_settings")
				.update({ ...updates, updated_at: new Date().toISOString() })
				.eq("id", existing.id)
				.select()
				.single();

			if (error) throw error;
			return data;
		}
		// Create new
		const { data, error } = await supabaseAdmin
			.from("site_settings")
			.insert({ ...updates, updated_at: new Date().toISOString() })
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to update site settings:", error);
		return null;
	}
}
