import type { Metadata } from "next";
import { Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const tenorSans = Tenor_Sans({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "LOKKOLUV",
	description: "Portfolio by LOKKOLUV",
	icons: {
		icon: "/images/eyecon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${tenorSans.className} antialiased`}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
