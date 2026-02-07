import type { ContentBlock } from "@/lib/types";

export const defaultContentBlocks: ContentBlock[] = [
	{
		id: "about-intro",
		block_key: "about_intro",
		title: null,
		content:
			"My story is a roller coaster of color and creativity built on a foundation of turmoil.",
		content_type: "text",
		is_visible: true,
		updated_at: new Date().toISOString(),
	},
	{
		id: "about-body-1",
		block_key: "about_body_1",
		title: null,
		content:
			"I grew up in LaSalle, a neighborhood teeming with energy that could easily ignite a young mind. While I spent my days playing sports and navigating a French school system, I felt a constant friction between the classroom and my home life. Coming from a background of Jamaican and Vincentian Patois, the language barrier in a French environment created a divide that was difficult to bridge.",
		content_type: "text",
		is_visible: true,
		updated_at: new Date().toISOString(),
	},
	{
		id: "about-body-2",
		block_key: "about_body_2",
		title: null,
		content:
			"Because of this, my true language was always art. I was constantly sketching and building small worlds out of scraps found in the basement apartment I shared with my mother. That world shifted forever just before my ninth birthday when my mother was wrongfully deported. What followed was a blur of bouncing from home to home and 'hood to 'hood. I eventually settled with my grandmother; she had recently retired and, instead of returning to Jamaica for the tranquility she'd earned, she chose to stay and take on the weight of raising me.",
		content_type: "text",
		is_visible: true,
		updated_at: new Date().toISOString(),
	},
	{
		id: "about-conclusion",
		block_key: "about_conclusion",
		title: null,
		content:
			"The events I've survived have wired my brain and shaped my hands. My work is a direct reflection of that history—a blend of Neo-Expressionism and fine-art graffiti born from the 'in-between.' I don't just paint; I document a life lived in the crosshairs of systemic disaster and creative survival. This is my life: unfiltered, unapologetic, and loud.",
		content_type: "text",
		is_visible: true,
		updated_at: new Date().toISOString(),
	},
	{
		id: "banner-text",
		block_key: "banner_text",
		title: null,
		content: "WE ARE ALL SINNERS",
		content_type: "text",
		is_visible: true,
		updated_at: new Date().toISOString(),
	},
	{
		id: "coming-soon-text",
		block_key: "coming_soon_text",
		title: null,
		content: "7 SINS COMING SOON",
		content_type: "text",
		is_visible: true,
		updated_at: new Date().toISOString(),
	},
];

export function getDefaultContentBlock(key: string): ContentBlock | undefined {
	return defaultContentBlocks.find((block) => block.block_key === key);
}
