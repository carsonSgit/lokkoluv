"use client";

import { usePreview as usePreviewContext } from "@/lib/context/PreviewContext";

export function usePreview() {
	return usePreviewContext();
}
