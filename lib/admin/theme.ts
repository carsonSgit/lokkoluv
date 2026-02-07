import { supabaseAdmin } from "@/lib/supabase-admin";
import type { ThemeSettings, AvailableFont } from "@/lib/types";
import { defaultTheme, defaultFonts } from "@/lib/fallbacks/theme";

export async function getThemeSettings(): Promise<ThemeSettings> {
	try {
		const { data, error } = await supabaseAdmin
			.from("theme_settings")
			.select("*")
			.limit(1)
			.single();

		if (error) throw error;
		return data ?? defaultTheme;
	} catch (error) {
		console.error("Failed to fetch theme settings:", error);
		return defaultTheme;
	}
}

export async function getPublishedTheme(): Promise<ThemeSettings> {
	try {
		const { data, error } = await supabaseAdmin
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

export async function updateThemeSettings(
	updates: Partial<ThemeSettings>,
): Promise<ThemeSettings | null> {
	try {
		const { data: existing } = await supabaseAdmin
			.from("theme_settings")
			.select("id")
			.limit(1)
			.single();

		if (existing) {
			const { data, error } = await supabaseAdmin
				.from("theme_settings")
				.update(updates)
				.eq("id", existing.id)
				.select()
				.single();

			if (error) throw error;
			return data;
		}
		const { data, error } = await supabaseAdmin
			.from("theme_settings")
			.insert(updates)
			.select()
			.single();

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Failed to update theme settings:", error);
		return null;
	}
}

export async function publishTheme(): Promise<boolean> {
	try {
		const { error } = await supabaseAdmin
			.from("theme_settings")
			.update({ is_published: true })
			.neq("is_published", true);

		if (error) throw error;
		return true;
	} catch (error) {
		console.error("Failed to publish theme:", error);
		return false;
	}
}

export async function getAvailableFonts(): Promise<AvailableFont[]> {
	try {
		const { data, error } = await supabaseAdmin
			.from("available_fonts")
			.select("*")
			.order("font_name");

		if (error) throw error;
		return data ?? defaultFonts;
	} catch (error) {
		console.error("Failed to fetch available fonts:", error);
		return defaultFonts;
	}
}
