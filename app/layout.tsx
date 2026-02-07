import type { Metadata } from "next";
import { Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import BehobenPreloader from "./components/BehobenPreloader";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { getPublicTheme } from "@/lib/public-data";

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const theme = await getPublicTheme();

	return (
		<html lang="en">
			<body className={`${tenorSans.className} antialiased`}>
				<ThemeProvider initialTheme={theme}>
					<BehobenPreloader />
					<Navbar />
					{children}
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
