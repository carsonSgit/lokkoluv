"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContentBlock } from "@/lib/types";

export default function ContentPage() {
	const [blocks, setBlocks] = useState<ContentBlock[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState<string | null>(null);
	const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

	const fetchBlocks = useCallback(async () => {
		try {
			const res = await fetch("/api/admin/content");
			if (res.ok) {
				const data = await res.json();
				setBlocks(data);
			}
		} catch (error) {
			console.error("Failed to fetch content:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchBlocks();
	}, [fetchBlocks]);

	const handleSave = async (block: ContentBlock) => {
		setSaving(block.id);

		try {
			const res = await fetch("/api/admin/content", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(block),
			});

			if (res.ok) {
				const updated = await res.json();
				setBlocks((prev) =>
					prev.map((b) => (b.id === updated.id ? updated : b)),
				);
				setEditingBlock(null);
			}
		} catch (error) {
			console.error("Failed to save content:", error);
		} finally {
			setSaving(null);
		}
	};

	const blockLabels: Record<string, string> = {
		about_intro: "About Page - Introduction",
		about_body_1: "About Page - Body Paragraph 1",
		about_body_2: "About Page - Body Paragraph 2",
		about_conclusion: "About Page - Conclusion",
		banner_text: "Homepage - Banner Text",
		coming_soon_text: "Homepage - Coming Soon Text",
	};

	if (loading) {
		return (
			<div className="space-y-6">
				<h1 className="text-3xl font-bold text-black">Content Editor</h1>
				<div className="space-y-4">
					{[...Array(4)].map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="bg-gray-100 rounded-lg h-32 animate-pulse"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold text-black">Content Editor</h1>
				<p className="text-gray-600 mt-1">Edit text content across your site</p>
			</div>

			<div className="space-y-4">
				{blocks.map((block) => (
					<div
						key={block.id}
						className="bg-white border border-gray-200 rounded-lg p-6"
					>
						<div className="flex items-start justify-between mb-4">
							<div>
								<h3 className="font-semibold text-black">
									{blockLabels[block.block_key] || block.block_key}
								</h3>
								<p className="text-sm text-gray-500">Key: {block.block_key}</p>
							</div>
							<div className="flex items-center gap-3">
								<label className="flex items-center gap-2 text-sm">
									<input
										type="checkbox"
										checked={block.is_visible}
										onChange={async (e) => {
											const updated = {
												...block,
												is_visible: e.target.checked,
											};
											setBlocks((prev) =>
												prev.map((b) => (b.id === block.id ? updated : b)),
											);
											await handleSave(updated);
										}}
										className="w-4 h-4"
									/>
									Visible
								</label>
							</div>
						</div>

						{editingBlock?.id === block.id ? (
							<div className="space-y-4">
								<textarea
									value={editingBlock.content}
									onChange={(e) =>
										setEditingBlock({
											...editingBlock,
											content: e.target.value,
										})
									}
									rows={5}
									className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none resize-y"
								/>
								<div className="flex gap-3">
									<button
										onClick={() => handleSave(editingBlock)}
										disabled={saving === block.id}
										type="button"
										className="px-4 py-2 bg-black text-white font-medium hover:bg-black/80 disabled:bg-black/40 transition-colors"
									>
										{saving === block.id ? "Saving..." : "Save"}
									</button>
									<button
										onClick={() => setEditingBlock(null)}
										type="button"
										className="px-4 py-2 border border-gray-300 text-gray-700 font-medium hover:border-black hover:text-black transition-colors"
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<p className="text-gray-700 whitespace-pre-wrap">
									{block.content}
								</p>
								<button
									onClick={() => setEditingBlock(block)}
									type="button"
									className="text-sm text-gray-600 hover:text-black underline"
								>
									Edit
								</button>
							</div>
						)}
					</div>
				))}

				{blocks.length === 0 && (
					<div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
						<p className="text-gray-500">
							No content blocks found. They will be created when you first save.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
