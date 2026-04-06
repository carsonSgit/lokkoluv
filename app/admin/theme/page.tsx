"use client";

import { useCallback, useEffect, useState } from "react";
import type { AvailableFont, ThemeSettings } from "@/lib/types";

export default function ThemePage() {
	const [theme, setTheme] = useState<ThemeSettings | null>(null);
	const [fonts, setFonts] = useState<AvailableFont[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [success, setSuccess] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			const [themeRes, fontsRes] = await Promise.all([
				fetch("/api/admin/theme"),
				fetch("/api/admin/theme?type=fonts"),
			]);

			if (themeRes.ok) {
				const themeData = await themeRes.json();
				setTheme(themeData);
			}

			if (fontsRes.ok) {
				const fontsData = await fontsRes.json();
				setFonts(fontsData);
			}
		} catch (error) {
			console.error("Failed to fetch theme:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleSave = async () => {
		if (!theme) return;

		setSaving(true);
		setSuccess(false);

		try {
			const res = await fetch("/api/admin/theme", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(theme),
			});

			if (res.ok) {
				setSuccess(true);
				setTimeout(() => setSuccess(false), 3000);
			}
		} catch (error) {
			console.error("Failed to save theme:", error);
		} finally {
			setSaving(false);
		}
	};

	const handlePublish = async () => {
		setSaving(true);

		try {
			const res = await fetch("/api/admin/theme", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action: "publish" }),
			});

			if (res.ok) {
				if (theme) {
					setTheme({ ...theme, is_published: true });
				}
				setSuccess(true);
				setTimeout(() => setSuccess(false), 3000);
			}
		} catch (error) {
			console.error("Failed to publish theme:", error);
		} finally {
			setSaving(false);
		}
	};

	if (loading || !theme) {
		return (
			<div className="max-w-2xl">
				<h1 className="text-3xl font-bold text-black mb-6">Theme</h1>
				<div className="space-y-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="bg-gray-100 rounded h-16 animate-pulse"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-2xl">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-black">Theme</h1>
				<p className="text-gray-600 mt-1">Customize fonts and colors</p>
			</div>

			{success && (
				<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 mb-6">
					Theme saved successfully!
				</div>
			)}

			<div className="space-y-6">
				{/* Colors */}
				<div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
					<h2 className="text-xl font-semibold text-black">Colors</h2>

					<div className="grid grid-cols-2 gap-6">
						<div>
							<label
								htmlFor="color_primary"
								className="block text-sm font-medium text-black mb-2"
							>
								Primary Color
							</label>
							<div className="flex items-center gap-3">
								<input
									id="color_primary"
									type="color"
									value={theme.color_primary}
									onChange={(e) =>
										setTheme({ ...theme, color_primary: e.target.value })
									}
									className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
								/>
								<input
									type="text"
									value={theme.color_primary}
									onChange={(e) =>
										setTheme({ ...theme, color_primary: e.target.value })
									}
									className="flex-1 px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-mono text-sm"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="color_background"
								className="block text-sm font-medium text-black mb-2"
							>
								Background Color
							</label>
							<div className="flex items-center gap-3">
								<input
									id="color_background"
									type="color"
									value={theme.color_background}
									onChange={(e) =>
										setTheme({ ...theme, color_background: e.target.value })
									}
									className="w-12 h-12 border border-gray-300 rounded cursor-pointer"
								/>
								<input
									type="text"
									value={theme.color_background}
									onChange={(e) =>
										setTheme({ ...theme, color_background: e.target.value })
									}
									className="flex-1 px-4 py-2 border border-gray-300 focus:border-black focus:outline-none font-mono text-sm"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Fonts */}
				<div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
					<h2 className="text-xl font-semibold text-black">Typography</h2>

					<div>
						<label
							htmlFor="font_heading"
							className="block text-sm font-medium text-black mb-2"
						>
							Heading Font
						</label>
						<select
							id="font_heading"
							value={theme.font_heading}
							onChange={(e) =>
								setTheme({ ...theme, font_heading: e.target.value })
							}
							className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						>
							{fonts.map((font) => (
								<option key={font.id} value={font.font_name}>
									{font.font_name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="font_body"
							className="block text-sm font-medium text-black mb-2"
						>
							Body Font
						</label>
						<select
							id="font_body"
							value={theme.font_body}
							onChange={(e) =>
								setTheme({ ...theme, font_body: e.target.value })
							}
							className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						>
							{fonts.map((font) => (
								<option key={font.id} value={font.font_name}>
									{font.font_name}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="size_heading_xl"
							className="block text-sm font-medium text-black mb-2"
						>
							XL Heading Size
						</label>
						<input
							id="size_heading_xl"
							type="text"
							value={theme.size_heading_xl}
							onChange={(e) =>
								setTheme({ ...theme, size_heading_xl: e.target.value })
							}
							className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none font-mono text-sm"
							placeholder="clamp(3rem,10vw,9rem)"
						/>
						<p className="text-sm text-gray-500 mt-1">
							Use clamp() for responsive sizing
						</p>
					</div>
				</div>

				{/* Preview */}
				<div
					className="border border-gray-200 rounded-lg p-8"
					style={{
						backgroundColor: theme.color_background,
						color: theme.color_primary,
					}}
				>
					<h2 className="text-xl font-semibold mb-4">Preview</h2>
					<h3
						className="font-bold mb-2"
						style={{
							fontFamily: fonts.find((f) => f.font_name === theme.font_heading)
								?.font_family,
							fontSize: "clamp(1.5rem,4vw,2.5rem)",
						}}
					>
						LOKKOLUV
					</h3>
					<p
						style={{
							fontFamily: fonts.find((f) => f.font_name === theme.font_body)
								?.font_family,
						}}
					>
						This is how your text will look with the selected fonts and colors.
					</p>
				</div>

				{/* Actions */}
				<div className="flex gap-4">
					<button
						onClick={handleSave}
						disabled={saving}
						type="button"
						className="flex-1 py-3 bg-black text-white font-medium hover:bg-black/80 disabled:bg-black/40 transition-colors"
					>
						{saving ? "Saving..." : "Save Draft"}
					</button>
					<button
						onClick={handlePublish}
						disabled={saving || theme.is_published}
						type="button"
						className="flex-1 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{theme.is_published ? "Published" : "Publish"}
					</button>
				</div>
			</div>
		</div>
	);
}
