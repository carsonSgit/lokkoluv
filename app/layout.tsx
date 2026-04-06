import type { Metadata } from "next";
import { Geist, Tenor_Sans, Work_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { CustomizationProvider } from "@/lib/context/CustomizationContext";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { getPublicTheme } from "@/lib/public-data";
import { cn } from "@/lib/utils";
import BehobenPreloader from "./components/BehobenPreloader";
import Navbar from "./components/Navbar";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
	adjustFontFallback: false,
});

const tenorSans = Tenor_Sans({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
});

const workSans = Work_Sans({
	weight: ["400", "500", "600"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
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
		<html lang="en" className={cn("font-sans", geist.variable)}>
			<body
				className={`${workSans.variable} ${tenorSans.variable} ${workSans.className} antialiased`}
			>
				<CustomizationProvider>
					<ThemeProvider initialTheme={theme}>
						<BehobenPreloader />
						<Navbar />
						{children}
					</ThemeProvider>
				</CustomizationProvider>
				<Analytics />
			</body>
		</html>
	);
}
