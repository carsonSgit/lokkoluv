"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import type { HomepageSection, HomepageItem } from "@/lib/types";

export default function HomepagePage() {
	const [sections, setSections] = useState<HomepageSection[]>([]);
	const [items, setItems] = useState<HomepageItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			const res = await fetch("/api/admin/homepage");
			if (res.ok) {
				const data = await res.json();
				setSections(data.sections || []);
				setItems(data.items || []);
			}
		} catch (error) {
			console.error("Failed to fetch homepage data:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const toggleSection = async (sectionKey: string, isVisible: boolean) => {
		setSaving(true);

		// Optimistic update
		setSections((prev) =>
			prev.map((s) =>
				s.section_key === sectionKey ? { ...s, is_visible: isVisible } : s,
			),
		);

		try {
			await fetch("/api/admin/homepage", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "toggle-section",
					sectionKey,
					isVisible,
				}),
			});
		} catch (error) {
			console.error("Failed to toggle section:", error);
			// Revert on error
			fetchData();
		} finally {
			setSaving(false);
		}
	};

	const toggleItem = async (id: string, isVisible: boolean) => {
		setSaving(true);

		// Optimistic update
		setItems((prev) =>
			prev.map((i) => (i.id === id ? { ...i, is_visible: isVisible } : i)),
		);

		try {
			await fetch("/api/admin/homepage", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, is_visible: isVisible }),
			});
		} catch (error) {
			console.error("Failed to toggle item:", error);
			fetchData();
		} finally {
			setSaving(false);
		}
	};

	const workItems = items.filter((i) => i.item_type === "work");
	const clothingItems = items.filter((i) => i.item_type === "clothing");

	if (loading) {
		return (
			<div className="space-y-6">
				<h1 className="text-3xl font-bold text-black">Homepage</h1>
				<div className="space-y-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="bg-gray-100 rounded-lg h-20 animate-pulse"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold text-black">Homepage</h1>
				<p className="text-gray-600 mt-1">
					Control section visibility and manage homepage items
					{saving && " · Saving..."}
				</p>
			</div>

			{/* Sections */}
			<div className="bg-white border border-gray-200 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-black mb-4">Sections</h2>
				<div className="space-y-3">
					{sections.map((section) => (
						<div
							key={section.id}
							className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
						>
							<div>
								<p className="font-medium text-black">{section.section_name}</p>
								<p className="text-sm text-gray-500">
									Key: {section.section_key}
								</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={section.is_visible}
									onChange={(e) =>
										toggleSection(section.section_key, e.target.checked)
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black" />
							</label>
						</div>
					))}
				</div>
			</div>

			{/* Work Previews */}
			<div className="bg-white border border-gray-200 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-black mb-4">Work Previews</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{workItems.map((item) => (
						<div
							key={item.id}
							className={`relative rounded-lg overflow-hidden ${
								!item.is_visible ? "opacity-50" : ""
							}`}
						>
							<div className="aspect-square bg-gray-100 relative">
								<Image
									src={item.image_url || `/images/${item.image_filename}`}
									alt={item.title || "Work preview"}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 25vw"
								/>
							</div>
							<div className="p-3 bg-gray-50">
								<p className="text-sm font-medium truncate">
									{item.title || "Untitled"}
								</p>
								<label className="flex items-center gap-2 mt-2 text-sm cursor-pointer">
									<input
										type="checkbox"
										checked={item.is_visible}
										onChange={(e) => toggleItem(item.id, e.target.checked)}
										className="w-4 h-4"
									/>
									Visible
								</label>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Clothing Items */}
			<div className="bg-white border border-gray-200 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-black mb-4">
					Clothing Items
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{clothingItems.map((item) => (
						<div
							key={item.id}
							className={`relative rounded-lg overflow-hidden ${
								!item.is_visible ? "opacity-50" : ""
							}`}
						>
							<div className="aspect-[3/4] bg-gray-100 relative">
								<Image
									src={item.image_url || `/images/${item.image_filename}`}
									alt="Clothing item"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 50vw, 33vw"
								/>
							</div>
							<div className="p-3 bg-gray-50">
								<label className="flex items-center gap-2 text-sm cursor-pointer">
									<input
										type="checkbox"
										checked={item.is_visible}
										onChange={(e) => toggleItem(item.id, e.target.checked)}
										className="w-4 h-4"
									/>
									Visible
								</label>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
