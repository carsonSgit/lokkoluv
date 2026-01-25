/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// Local images only - no remote patterns needed
		formats: ["image/webp", "image/avif"],
	},
};

module.exports = nextConfig;
