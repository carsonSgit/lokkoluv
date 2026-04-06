/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/webp", "image/avif"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.youtube.com",
				port: "",
				pathname: "/vi/**",
			},
			{
				protocol: "https",
				hostname: "*.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/**",
			},
		],
	},
};

module.exports = nextConfig;
