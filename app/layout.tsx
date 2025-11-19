import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

