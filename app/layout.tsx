import type { Metadata } from "next";
import { Tenor_Sans, Work_Sans, Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import BehobenPreloader from "./components/BehobenPreloader";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { CustomizationProvider } from "@/lib/context/CustomizationContext";
import { getPublicTheme } from "@/lib/public-data";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
			<body className={`${workSans.variable} ${tenorSans.variable} ${workSans.className} antialiased`}>
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
