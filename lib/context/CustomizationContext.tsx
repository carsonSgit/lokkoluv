"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { type SiteConfig, defaultSiteConfig } from "../config/siteConfig";

type CustomizationContextType = {
	config: SiteConfig;
	updateConfig: (newConfig: Partial<SiteConfig>) => void;
	resetConfig: () => void;
};

const CustomizationContext = createContext<CustomizationContextType | undefined>(
	undefined
);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
	const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
	const [mounted, setMounted] = useState(false);

	// Load from localStorage on mount
	useEffect(() => {
		setMounted(true);
		try {
			const stored = localStorage.getItem("siteConfig");
			if (stored) {
				setConfig({ ...defaultSiteConfig, ...JSON.parse(stored) });
			}
		} catch (e) {
			console.error("Failed to load site config from localStorage:", e);
		}
	}, []);

	// Apply CSS variables and save to localStorage on change
	useEffect(() => {
		if (!mounted) return;
		
		const root = document.documentElement;
		root.style.setProperty("--color-primary", config.primaryColor);
		root.style.setProperty("--color-background", config.backgroundColor);
		// Also provide --custom-* variables for explicit overrides
		root.style.setProperty("--custom-primary", config.primaryColor);
		root.style.setProperty("--custom-bg", config.backgroundColor);
		root.style.setProperty("--custom-text", config.textColor);
		root.style.setProperty("--custom-radius", config.borderRadius);

		try {
			localStorage.setItem("siteConfig", JSON.stringify(config));
		} catch (e) {
			console.error("Failed to save site config to localStorage:", e);
		}
	}, [config, mounted]);

	const updateConfig = (newConfig: Partial<SiteConfig>) => {
		setConfig((prev) => ({ ...prev, ...newConfig }));
	};

	const resetConfig = () => {
		setConfig(defaultSiteConfig);
	};

	return (
		<CustomizationContext.Provider value={{ config, updateConfig, resetConfig }}>
			{children}
		</CustomizationContext.Provider>
	);
}

export function useCustomization() {
	const context = useContext(CustomizationContext);
	if (context === undefined) {
		throw new Error("useCustomization must be used within a CustomizationProvider");
	}
	return context;
}
