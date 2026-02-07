import type { SiteSettings } from "@/lib/types";

export const defaultSettings: SiteSettings = {
	id: "default",
	site_name: "LOKKOLUV",
	contact_email: "inquiry@lokkoluv.com",
	instagram_url: "https://www.instagram.com/lokkoluv/",
	instagram_handle: "@lokkoluv",
	tiktok_url: "https://www.tiktok.com/@lokkoluv",
	tiktok_handle: "@lokkoluv",
	updated_at: new Date().toISOString(),
};
