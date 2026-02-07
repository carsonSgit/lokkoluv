"use client";

import { useEffect, useState, useCallback } from "react";
import type { SiteSettings } from "@/lib/types";

export default function SettingsPage() {
	const [settings, setSettings] = useState<SiteSettings | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [success, setSuccess] = useState(false);

	const fetchSettings = useCallback(async () => {
		try {
			const res = await fetch("/api/admin/settings");
			if (res.ok) {
				const data = await res.json();
				setSettings(data);
			}
		} catch (error) {
			console.error("Failed to fetch settings:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchSettings();
	}, [fetchSettings]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!settings) return;

		setSaving(true);
		setSuccess(false);

		try {
			const res = await fetch("/api/admin/settings", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(settings),
			});

			if (res.ok) {
				setSuccess(true);
				setTimeout(() => setSuccess(false), 3000);
			}
		} catch (error) {
			console.error("Failed to save settings:", error);
		} finally {
			setSaving(false);
		}
	};

	if (loading || !settings) {
		return (
			<div className="max-w-2xl">
				<h1 className="text-3xl font-bold text-black mb-6">Settings</h1>
				<div className="space-y-4">
					{[...Array(5)].map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="bg-gray-100 rounded h-12 animate-pulse"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-2xl">
			<div className="mb-6">
				<h1 className="text-3xl font-bold text-black">Settings</h1>
				<p className="text-gray-600 mt-1">
					Configure site-wide settings and social links
				</p>
			</div>

			{success && (
				<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 mb-6">
					Settings saved successfully!
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
					<h2 className="text-xl font-semibold text-black">General</h2>

					<div>
						<label
							htmlFor="site_name"
							className="block text-sm font-medium text-black mb-2"
						>
							Site Name
						</label>
						<input
							id="site_name"
							type="text"
							value={settings.site_name}
							onChange={(e) =>
								setSettings({ ...settings, site_name: e.target.value })
							}
							className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						/>
					</div>

					<div>
						<label
							htmlFor="contact_email"
							className="block text-sm font-medium text-black mb-2"
						>
							Contact Email
						</label>
						<input
							id="contact_email"
							type="email"
							value={settings.contact_email}
							onChange={(e) =>
								setSettings({ ...settings, contact_email: e.target.value })
							}
							className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						/>
					</div>
				</div>

				<div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
					<h2 className="text-xl font-semibold text-black">Social Links</h2>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="instagram_handle"
								className="block text-sm font-medium text-black mb-2"
							>
								Instagram Handle
							</label>
							<input
								id="instagram_handle"
								type="text"
								value={settings.instagram_handle}
								onChange={(e) =>
									setSettings({ ...settings, instagram_handle: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
								placeholder="@lokkoluv"
							/>
						</div>

						<div>
							<label
								htmlFor="instagram_url"
								className="block text-sm font-medium text-black mb-2"
							>
								Instagram URL
							</label>
							<input
								id="instagram_url"
								type="url"
								value={settings.instagram_url || ""}
								onChange={(e) =>
									setSettings({
										...settings,
										instagram_url: e.target.value || null,
									})
								}
								className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
								placeholder="https://instagram.com/lokkoluv"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label
								htmlFor="tiktok_handle"
								className="block text-sm font-medium text-black mb-2"
							>
								TikTok Handle
							</label>
							<input
								id="tiktok_handle"
								type="text"
								value={settings.tiktok_handle}
								onChange={(e) =>
									setSettings({ ...settings, tiktok_handle: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
								placeholder="@lokkoluv"
							/>
						</div>

						<div>
							<label
								htmlFor="tiktok_url"
								className="block text-sm font-medium text-black mb-2"
							>
								TikTok URL
							</label>
							<input
								id="tiktok_url"
								type="url"
								value={settings.tiktok_url || ""}
								onChange={(e) =>
									setSettings({
										...settings,
										tiktok_url: e.target.value || null,
									})
								}
								className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
								placeholder="https://tiktok.com/@lokkoluv"
							/>
						</div>
					</div>
				</div>

				<button
					type="submit"
					disabled={saving}
					className="w-full py-3 bg-black text-white font-medium hover:bg-black/80 disabled:bg-black/40 transition-colors"
				>
					{saving ? "Saving..." : "Save Settings"}
				</button>
			</form>
		</div>
	);
}
