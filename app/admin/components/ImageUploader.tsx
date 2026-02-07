"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
	onUploadComplete: (url: string, filename?: string) => void;
	currentImage?: string | null;
	folder?: string;
}

export default function ImageUploader({
	onUploadComplete,
	currentImage,
	folder = "gallery",
}: ImageUploaderProps) {
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Validate file type
		if (!file.type.startsWith("image/")) {
			setError("Please select an image file");
			return;
		}

		// Validate file size (max 10MB)
		if (file.size > 10 * 1024 * 1024) {
			setError("Image must be less than 10MB");
			return;
		}

		// Create preview
		const reader = new FileReader();
		reader.onload = () => {
			setPreview(reader.result as string);
		};
		reader.readAsDataURL(file);

		// Upload
		setUploading(true);
		setError(null);

		try {
			const formData = new FormData();
			formData.append("file", file);
			formData.append("folder", folder);

			const res = await fetch("/api/admin/upload", {
				method: "POST",
				body: formData,
			});

			if (!res.ok) {
				throw new Error("Upload failed");
			}

			const data = await res.json();
			onUploadComplete(data.url, data.filename);
		} catch {
			setError("Failed to upload image");
			setPreview(null);
		} finally {
			setUploading(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const file = e.dataTransfer.files?.[0];
		if (file && fileInputRef.current) {
			const dt = new DataTransfer();
			dt.items.add(file);
			fileInputRef.current.files = dt.files;
			fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
		}
	};

	const displayImage = preview || currentImage;

	return (
		<div>
			<label className="block text-sm font-medium text-black mb-2">
				Image
			</label>

			<div
				onDrop={handleDrop}
				onDragOver={(e) => e.preventDefault()}
				className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
					uploading ? "border-gray-300 bg-gray-50" : "border-gray-300 hover:border-black"
				}`}
			>
				{displayImage ? (
					<div className="space-y-4">
						<div className="relative w-full aspect-square max-w-xs mx-auto bg-gray-100 rounded-lg overflow-hidden">
							<Image
								src={displayImage}
								alt="Preview"
								fill
								className="object-cover"
							/>
						</div>
						<button
							type="button"
							onClick={() => fileInputRef.current?.click()}
							disabled={uploading}
							className="text-sm text-gray-600 hover:text-black underline"
						>
							{uploading ? "Uploading..." : "Change image"}
						</button>
					</div>
				) : (
					<div className="space-y-2">
						<div className="text-4xl">📷</div>
						<p className="text-gray-600">
							{uploading ? "Uploading..." : "Drag & drop or click to upload"}
						</p>
						<p className="text-sm text-gray-400">PNG, JPG, WebP up to 10MB</p>
					</div>
				)}

				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					onChange={handleFileSelect}
					disabled={uploading}
					className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
				/>
			</div>

			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</div>
	);
}
