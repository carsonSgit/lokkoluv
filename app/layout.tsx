import type { Metadata } from "next";
import { Tenor_Sans } from "next/font/google";
import "./globals.css";

const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LOKKOLUV",
  description: "Portfolio by LOKKOLUV",
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
      </body>
    </html>
  );
}

