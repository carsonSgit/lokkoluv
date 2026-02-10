import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				heading: ["var(--font-heading)", "serif"],
				body: ["var(--font-body)", "sans-serif"],
			},
			letterSpacing: {
				"ultra-wide": "27.84px",
				"wide-social": "2.16px",
			},
		},
	},
	plugins: [],
};
export default config;
