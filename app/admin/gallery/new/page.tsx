"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "../../components/ImageUploader";

export default function NewPiecePage() {
	const router = useRouter();

	const [form, setForm] = useState({
		title: "",
		year: new Date().getFullYear(),
		piece_number: 0,
		image_filename: "",
		image_url: "",
		size: "",
		mediums: "",
		techniques: "",
		surface: "",
		is_visible: true,
	});
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.image_url && !form.image_filename) {
			setError("Please upload an image");
			return;
		}

		setSaving(true);
		setError(null);

		try {
			const res = await fetch("/api/admin/gallery", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...form,
					size: form.size || null,
					mediums: form.mediums || null,
					techniques: form.techniques || null,
					surface: form.surface || null,
					display_order: 999, // Will be at the end
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to create piece");
			}

			router.push("/admin/gallery");
		} catch {
			setError("Failed to create piece");
		} finally {
			setSaving(false);
		}
	};

	const handleImageUploaded = (url: string, filename?: string) => {
		setForm({
			...form,
			image_url: url,
			image_filename: filename || url.split("/").pop() || "",
		});
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="mb-6">
				<Link
					href="/admin/gallery"
					className="text-gray-600 hover:text-black flex items-center gap-2"
				>
					<span>←</span> Back to Gallery
				</Link>
			</div>

			<h1 className="text-3xl font-bold text-black mb-6">Add New Piece</h1>

			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Image Upload */}
				<ImageUploader
					onUploadComplete={handleImageUploaded}
					currentImage={form.image_url}
				/>

				{/* Title */}
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-black mb-2"
					>
						Title *
					</label>
					<input
						id="title"
						type="text"
						value={form.title}
						onChange={(e) => setForm({ ...form, title: e.target.value })}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						required
					/>
				</div>

				{/* Piece Number */}
				<div>
					<label
						htmlFor="piece_number"
						className="block text-sm font-medium text-black mb-2"
					>
						Piece Number *
					</label>
					<input
						id="piece_number"
						type="number"
						value={form.piece_number}
						onChange={(e) =>
							setForm({ ...form, piece_number: parseInt(e.target.value, 10) })
						}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						required
					/>
				</div>

				{/* Year */}
				<div>
					<label
						htmlFor="year"
						className="block text-sm font-medium text-black mb-2"
					>
						Year *
					</label>
					<input
						id="year"
						type="number"
						value={form.year}
						onChange={(e) =>
							setForm({ ...form, year: parseInt(e.target.value, 10) })
						}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						required
					/>
				</div>

				{/* Size */}
				<div>
					<label
						htmlFor="size"
						className="block text-sm font-medium text-black mb-2"
					>
						Size
					</label>
					<input
						id="size"
						type="text"
						value={form.size}
						onChange={(e) => setForm({ ...form, size: e.target.value })}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						placeholder='e.g., 24" x 36"'
					/>
				</div>

				{/* Mediums */}
				<div>
					<label
						htmlFor="mediums"
						className="block text-sm font-medium text-black mb-2"
					>
						Mediums
					</label>
					<input
						id="mediums"
						type="text"
						value={form.mediums}
						onChange={(e) => setForm({ ...form, mediums: e.target.value })}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						placeholder="e.g., Acrylic, Oil"
					/>
				</div>

				{/* Techniques */}
				<div>
					<label
						htmlFor="techniques"
						className="block text-sm font-medium text-black mb-2"
					>
						Techniques
					</label>
					<input
						id="techniques"
						type="text"
						value={form.techniques}
						onChange={(e) => setForm({ ...form, techniques: e.target.value })}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						placeholder="e.g., Mixed media, Spray paint"
					/>
				</div>

				{/* Surface */}
				<div>
					<label
						htmlFor="surface"
						className="block text-sm font-medium text-black mb-2"
					>
						Surface
					</label>
					<input
						id="surface"
						type="text"
						value={form.surface}
						onChange={(e) => setForm({ ...form, surface: e.target.value })}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						placeholder="e.g., Canvas, Wood panel"
					/>
				</div>

				{/* Visibility */}
				<div className="flex items-center gap-3">
					<input
						id="visible"
						type="checkbox"
						checked={form.is_visible}
						onChange={(e) => setForm({ ...form, is_visible: e.target.checked })}
						className="w-5 h-5 border-gray-300 rounded"
					/>
					<label htmlFor="visible" className="text-sm font-medium text-black">
						Visible on public site
					</label>
				</div>

				{/* Actions */}
				<div className="flex gap-4 pt-4">
					<button
						type="submit"
						disabled={saving}
						className="flex-1 py-3 bg-black text-white font-medium hover:bg-black/80 disabled:bg-black/40 transition-colors"
					>
						{saving ? "Creating..." : "Create Piece"}
					</button>
					<Link
						href="/admin/gallery"
						className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:border-black hover:text-black transition-colors text-center"
					>
						Cancel
					</Link>
				</div>
			</form>
		</div>
	);
}
