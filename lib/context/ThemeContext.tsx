"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultTheme } from "@/lib/fallbacks/theme";
import type { ThemeSettings } from "@/lib/types";

interface ThemeContextValue {
	theme: ThemeSettings;
	isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
	theme: defaultTheme,
	isLoading: true,
});

export function useTheme() {
	return useContext(ThemeContext);
}

interface ThemeProviderProps {
	children: React.ReactNode;
	initialTheme?: ThemeSettings;
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
	const [theme, setTheme] = useState<ThemeSettings>(
		initialTheme || defaultTheme,
	);
	const [isLoading, setIsLoading] = useState(!initialTheme);

	useEffect(() => {
		if (initialTheme) {
			setTheme(initialTheme);
			setIsLoading(false);
			return;
		}

		// Fetch published theme on client
		async function fetchTheme() {
			try {
				const res = await fetch("/api/theme");
				if (res.ok) {
					const data = await res.json();
					setTheme(data);
				}
			} catch (error) {
				console.error("Failed to fetch theme:", error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchTheme();
	}, [initialTheme]);

	// Apply CSS variables
	useEffect(() => {
		if (typeof document !== "undefined") {
			const root = document.documentElement;
			root.style.setProperty("--color-primary", theme.color_primary);
			root.style.setProperty("--color-background", theme.color_background);
			root.style.setProperty("--font-heading", theme.font_heading);
			root.style.setProperty("--font-body", theme.font_body);
			root.style.setProperty("--size-heading-xl", theme.size_heading_xl);
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, isLoading }}>
			{children}
		</ThemeContext.Provider>
	);
}
