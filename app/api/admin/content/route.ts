import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/supabase-server";
import {
	getContentBlocks,
	getContentBlock,
	updateContentBlock,
	upsertContentBlock,
} from "@/lib/admin/content";

export async function GET(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const key = searchParams.get("key");

	if (key) {
		const block = await getContentBlock(key);
		if (!block) {
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		}
		return NextResponse.json(block);
	}

	const blocks = await getContentBlocks();
	return NextResponse.json(blocks);
}

export async function PUT(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { id, ...updates } = body;

		if (!id) {
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		const block = await updateContentBlock(id, updates);
		if (!block) {
			return NextResponse.json(
				{ error: "Failed to update content" },
				{ status: 500 },
			);
		}

		return NextResponse.json(block);
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}

export async function POST(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const block = await upsertContentBlock(body);

		if (!block) {
			return NextResponse.json(
				{ error: "Failed to save content" },
				{ status: 500 },
			);
		}

		return NextResponse.json(block, { status: 201 });
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
