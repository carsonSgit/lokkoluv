export interface BehobenPiece {
	id: string;
	piece_number: number;
	title: string;
	year: number;
	image_filename: string;
	display_order: number;
	size: string | null;
	mediums: string | null;
	techniques: string | null;
	surface: string | null;
}

// Extended type for admin with optional Storage URL
export interface BehobenPieceAdmin extends BehobenPiece {
	image_url?: string | null;
	is_visible?: boolean;
	created_at?: string;
	updated_at?: string;
}

// Site settings
export interface SiteSettings {
	id: string;
	site_name: string;
	contact_email: string;
	instagram_url: string | null;
	instagram_handle: string;
	tiktok_url: string | null;
	tiktok_handle: string;
	updated_at: string;
}

// Content blocks
export interface ContentBlock {
	id: string;
	block_key: string;
	title: string | null;
	content: string;
	content_type: "text" | "html" | "markdown";
	is_visible: boolean;
	updated_at: string;
}

// Homepage sections
export interface HomepageSection {
	id: string;
	section_key: string;
	section_name: string;
	is_visible: boolean;
	display_order: number;
}

// Homepage items
export interface HomepageItem {
	id: string;
	item_type: "work" | "clothing";
	title: string | null;
	image_filename: string;
	image_url: string | null;
	display_order: number;
	is_visible: boolean;
}

// Theme settings
export interface ThemeSettings {
	id: string;
	color_primary: string;
	color_background: string;
	font_heading: string;
	font_body: string;
	size_heading_xl: string;
	is_published: boolean;
}

// Available fonts
export interface AvailableFont {
	id: string;
	font_name: string;
	font_family: string;
	google_font_url: string | null;
	category: string;
}
