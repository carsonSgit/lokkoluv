"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface PreviewContextValue {
	isPreviewMode: boolean;
	enablePreview: () => void;
	disablePreview: () => void;
	togglePreview: () => void;
}

const PreviewContext = createContext<PreviewContextValue>({
	isPreviewMode: false,
	enablePreview: () => {},
	disablePreview: () => {},
	togglePreview: () => {},
});

export function usePreview() {
	return useContext(PreviewContext);
}

interface PreviewProviderProps {
	children: React.ReactNode;
}

export function PreviewProvider({ children }: PreviewProviderProps) {
	const [isPreviewMode, setIsPreviewMode] = useState(false);

	const enablePreview = useCallback(() => {
		setIsPreviewMode(true);
	}, []);

	const disablePreview = useCallback(() => {
		setIsPreviewMode(false);
	}, []);

	const togglePreview = useCallback(() => {
		setIsPreviewMode((prev) => !prev);
	}, []);

	return (
		<PreviewContext.Provider
			value={{ isPreviewMode, enablePreview, disablePreview, togglePreview }}
		>
			{children}
		</PreviewContext.Provider>
	);
}
