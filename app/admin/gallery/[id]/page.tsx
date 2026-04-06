"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/behoben-data";
import type { BehobenPieceAdmin } from "@/lib/types";
import ImageUploader from "../../components/ImageUploader";

export default function EditPiecePage() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;

	const [piece, setPiece] = useState<BehobenPieceAdmin | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchPiece = useCallback(async () => {
		try {
			const res = await fetch(`/api/admin/gallery?id=${id}`);
			if (res.ok) {
				const found: BehobenPieceAdmin = await res.json();
				setPiece(found);
			} else {
				setError("Piece not found");
			}
		} catch {
			setError("Failed to load piece");
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchPiece();
	}, [fetchPiece]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!piece) return;

		setSaving(true);
		setError(null);

		try {
			const res = await fetch("/api/admin/gallery", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(piece),
			});

			if (!res.ok) {
				throw new Error("Failed to save");
			}

			router.push("/admin/gallery");
		} catch {
			setError("Failed to save piece");
		} finally {
			setSaving(false);
		}
	};

	const handleImageUploaded = (url: string) => {
		if (piece) {
			setPiece({ ...piece, image_url: url });
		}
	};

	if (loading) {
		return (
			<div className="max-w-2xl mx-auto">
				<div className="animate-pulse space-y-4">
					<div className="h-8 bg-gray-200 rounded w-1/4" />
					<div className="h-64 bg-gray-200 rounded" />
					<div className="h-10 bg-gray-200 rounded" />
				</div>
			</div>
		);
	}

	if (error && !piece) {
		return (
			<div className="max-w-2xl mx-auto text-center py-12">
				<p className="text-red-600 mb-4">{error}</p>
				<Link href="/admin/gallery" className="text-black hover:underline">
					Back to Gallery
				</Link>
			</div>
		);
	}

	if (!piece) return null;

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

			<h1 className="text-3xl font-bold text-black mb-6">Edit Piece</h1>

			{error && (
				<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6">
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-6">
				{/* Current Image */}
				<div>
					<label className="block text-sm font-medium text-black mb-2">
						Current Image
					</label>
					<div className="relative w-full aspect-square max-w-md bg-gray-100 rounded-lg overflow-hidden">
						<Image
							src={getImageUrl(piece)}
							alt={piece.title}
							fill
							className="object-cover"
						/>
					</div>
				</div>

				{/* Image Upload */}
				<ImageUploader
					onUploadComplete={handleImageUploaded}
					currentImage={piece.image_url}
				/>

				{/* Title */}
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-black mb-2"
					>
						Title
					</label>
					<input
						id="title"
						type="text"
						value={piece.title}
						onChange={(e) => setPiece({ ...piece, title: e.target.value })}
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
						Year
					</label>
					<input
						id="year"
						type="number"
						value={piece.year}
						onChange={(e) =>
							setPiece({ ...piece, year: parseInt(e.target.value, 10) })
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
						value={piece.size || ""}
						onChange={(e) =>
							setPiece({ ...piece, size: e.target.value || null })
						}
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
						value={piece.mediums || ""}
						onChange={(e) =>
							setPiece({ ...piece, mediums: e.target.value || null })
						}
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
						value={piece.techniques || ""}
						onChange={(e) =>
							setPiece({ ...piece, techniques: e.target.value || null })
						}
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
						value={piece.surface || ""}
						onChange={(e) =>
							setPiece({ ...piece, surface: e.target.value || null })
						}
						className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none"
						placeholder="e.g., Canvas, Wood panel"
					/>
				</div>

				{/* Visibility */}
				<div className="flex items-center gap-3">
					<input
						id="visible"
						type="checkbox"
						checked={piece.is_visible !== false}
						onChange={(e) =>
							setPiece({ ...piece, is_visible: e.target.checked })
						}
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
						{saving ? "Saving..." : "Save Changes"}
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
