import type { SiteSettings } from "@/lib/types";

export const defaultSettings: SiteSettings = {
	id: "default",
	site_name: "LOKKOLUV",
	contact_email: "inquiry@lokkoluv.com",
	instagram_url: "https://www.instagram.com/lokkoluv/",
	instagram_handle: "@lokkoluv",
	youtube_url: "https://www.youtube.com/@LOKKOLUV/videos",
	youtube_handle: "@LOKKOLUV",
	updated_at: new Date().toISOString(),
};
