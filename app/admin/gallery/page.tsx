"use client";

import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
	sortableKeyboardCoordinates,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/behoben-data";
import type { BehobenPieceAdmin } from "@/lib/types";

interface SortableItemProps {
	piece: BehobenPieceAdmin;
	onDelete: (id: string) => void;
}

function SortableItem({ piece, onDelete }: SortableItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: piece.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="bg-white border border-gray-200 rounded-lg overflow-hidden group"
		>
			<div
				{...attributes}
				{...listeners}
				className="cursor-grab active:cursor-grabbing"
			>
				<div className="relative aspect-square bg-gray-100">
					<Image
						src={getImageUrl(piece)}
						alt={piece.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 50vw, 25vw"
					/>
					{piece.is_visible === false && (
						<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
							<span className="text-white text-sm font-medium">Hidden</span>
						</div>
					)}
				</div>
			</div>

			<div className="p-4">
				<h3 className="font-semibold text-black truncate">{piece.title}</h3>
				<p className="text-sm text-gray-500">{piece.year}</p>

				<div className="flex gap-2 mt-3">
					<Link
						href={`/admin/gallery/${piece.id}`}
						className="flex-1 py-2 text-center text-sm font-medium text-gray-700 hover:text-black border border-gray-300 hover:border-black rounded transition-colors"
					>
						Edit
					</Link>
					<button
						onClick={() => onDelete(piece.id)}
						type="button"
						className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 rounded transition-colors"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default function GalleryPage() {
	const [pieces, setPieces] = useState<BehobenPieceAdmin[]>([]);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const fetchPieces = useCallback(async () => {
		try {
			const res = await fetch("/api/admin/gallery");
			if (res.ok) {
				const data = await res.json();
				setPieces(data);
			}
		} catch (error) {
			console.error("Failed to fetch gallery:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPieces();
	}, [fetchPieces]);

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const oldIndex = pieces.findIndex((p) => p.id === active.id);
			const newIndex = pieces.findIndex((p) => p.id === over.id);

			const newPieces = arrayMove(pieces, oldIndex, newIndex);
			setPieces(newPieces);

			// Save new order
			setSaving(true);
			try {
				await fetch("/api/admin/gallery", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						action: "reorder",
						orderedIds: newPieces.map((p) => p.id),
					}),
				});
			} catch (error) {
				console.error("Failed to save order:", error);
				// Revert on error
				fetchPieces();
			} finally {
				setSaving(false);
			}
		}
	};

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this piece?")) return;

		try {
			const res = await fetch(`/api/admin/gallery?id=${id}`, {
				method: "DELETE",
			});

			if (res.ok) {
				setPieces((prev) => prev.filter((p) => p.id !== id));
			}
		} catch (error) {
			console.error("Failed to delete piece:", error);
		}
	};

	if (loading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-3xl font-bold text-black">Gallery</h1>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{[...Array(8)].map((_, i) => (
						<div
							key={`skeleton-${i}`}
							className="bg-gray-100 rounded-lg aspect-square animate-pulse"
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-black">Gallery</h1>
					<p className="text-gray-600 mt-1">
						Drag to reorder. {saving && "Saving..."}
					</p>
				</div>
				<Link
					href="/admin/gallery/new"
					className="px-4 py-2 bg-black text-white font-medium rounded hover:bg-black/80 transition-colors"
				>
					Add Piece
				</Link>
			</div>

			{pieces.length === 0 ? (
				<div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
					<p className="text-gray-500 mb-4">No gallery pieces yet</p>
					<Link
						href="/admin/gallery/new"
						className="text-black font-medium hover:underline"
					>
						Add your first piece
					</Link>
				</div>
			) : (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={pieces.map((p) => p.id)}
						strategy={rectSortingStrategy}
					>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{pieces.map((piece) => (
								<SortableItem
									key={piece.id}
									piece={piece}
									onDelete={handleDelete}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			)}
		</div>
	);
}
