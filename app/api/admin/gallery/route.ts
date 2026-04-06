import { type NextRequest, NextResponse } from "next/server";
import {
	createGalleryPiece,
	deleteGalleryPiece,
	getGalleryPiece,
	getGalleryPieces,
	reorderGalleryPieces,
	updateGalleryPiece,
} from "@/lib/admin/gallery";
import { getUser } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const id = searchParams.get("id");

	// Fetch single piece by ID if provided
	if (id) {
		const piece = await getGalleryPiece(id);
		if (!piece) {
			return NextResponse.json({ error: "Piece not found" }, { status: 404 });
		}
		return NextResponse.json(piece);
	}

	// Otherwise fetch all pieces
	const pieces = await getGalleryPieces();
	return NextResponse.json(pieces);
}

export async function POST(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const piece = await createGalleryPiece(body);

		if (!piece) {
			return NextResponse.json(
				{ error: "Failed to create piece" },
				{ status: 500 },
			);
		}

		return NextResponse.json(piece, { status: 201 });
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}

export async function PUT(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();

		// Handle reorder operation
		if (body.action === "reorder" && Array.isArray(body.orderedIds)) {
			const success = await reorderGalleryPieces(body.orderedIds);
			if (!success) {
				return NextResponse.json(
					{ error: "Failed to reorder" },
					{ status: 500 },
				);
			}
			return NextResponse.json({ success: true });
		}

		// Handle single piece update
		const { id, ...updates } = body;
		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const piece = await updateGalleryPiece(id, updates);
		if (!piece) {
			return NextResponse.json(
				{ error: "Failed to update piece" },
				{ status: 500 },
			);
		}

		return NextResponse.json(piece);
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}

export async function DELETE(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const success = await deleteGalleryPiece(id);
		if (!success) {
			return NextResponse.json(
				{ error: "Failed to delete piece" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
