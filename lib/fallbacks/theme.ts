import type { AvailableFont, ThemeSettings } from "@/lib/types";

export const defaultTheme: ThemeSettings = {
	id: "default",
	color_primary: "#000000",
	color_background: "#ffffff",
	font_heading: "Tenor Sans",
	font_body: "Tenor Sans",
	size_heading_xl: "clamp(3rem,10vw,9rem)",
	is_published: true,
};

export const defaultFonts: AvailableFont[] = [
	{
		id: "tenor-sans",
		font_name: "Tenor Sans",
		font_family: '"Tenor Sans", serif',
		google_font_url:
			"https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap",
		category: "serif",
	},
	{
		id: "inter",
		font_name: "Inter",
		font_family: '"Inter", sans-serif',
		google_font_url:
			"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
		category: "sans-serif",
	},
	{
		id: "playfair",
		font_name: "Playfair Display",
		font_family: '"Playfair Display", serif',
		google_font_url:
			"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap",
		category: "serif",
	},
	{
		id: "montserrat",
		font_name: "Montserrat",
		font_family: '"Montserrat", sans-serif',
		google_font_url:
			"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
		category: "sans-serif",
	},
	{
		id: "bebas-neue",
		font_name: "Bebas Neue",
		font_family: '"Bebas Neue", sans-serif',
		google_font_url:
			"https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
		category: "sans-serif",
	},
];
