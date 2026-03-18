import { type NextRequest, NextResponse } from "next/server";
import {
	createHomepageItem,
	deleteHomepageItem,
	getHomepageItems,
	getHomepageSections,
	reorderHomepageItems,
	toggleSectionVisibility,
	updateHomepageItem,
	updateHomepageSection,
} from "@/lib/admin/homepage";
import { getUser } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type") as "sections" | "items" | null;
	const itemType = searchParams.get("itemType") as "work" | "clothing" | null;

	if (type === "sections") {
		const sections = await getHomepageSections();
		return NextResponse.json(sections);
	}

	if (type === "items") {
		const items = await getHomepageItems(itemType ?? undefined);
		return NextResponse.json(items);
	}

	// Return both by default
	const [sections, items] = await Promise.all([
		getHomepageSections(),
		getHomepageItems(),
	]);

	return NextResponse.json({ sections, items });
}

export async function PUT(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const { action, ...data } = body;

		// Toggle section visibility
		if (action === "toggle-section") {
			const { sectionKey, isVisible } = data;
			const success = await toggleSectionVisibility(sectionKey, isVisible);
			if (!success) {
				return NextResponse.json(
					{ error: "Failed to toggle section" },
					{ status: 500 },
				);
			}
			return NextResponse.json({ success: true });
		}

		// Reorder items
		if (action === "reorder-items") {
			const { orderedIds } = data;
			const success = await reorderHomepageItems(orderedIds);
			if (!success) {
				return NextResponse.json(
					{ error: "Failed to reorder items" },
					{ status: 500 },
				);
			}
			return NextResponse.json({ success: true });
		}

		// Update section
		if (data.type === "section") {
			const { id, ...updates } = data;
			const section = await updateHomepageSection(id, updates);
			if (!section) {
				return NextResponse.json(
					{ error: "Failed to update section" },
					{ status: 500 },
				);
			}
			return NextResponse.json(section);
		}

		// Update item
		const { id, ...updates } = data;
		const item = await updateHomepageItem(id, updates);
		if (!item) {
			return NextResponse.json(
				{ error: "Failed to update item" },
				{ status: 500 },
			);
		}
		return NextResponse.json(item);
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
		const item = await createHomepageItem(body);

		if (!item) {
			return NextResponse.json(
				{ error: "Failed to create item" },
				{ status: 500 },
			);
		}

		return NextResponse.json(item, { status: 201 });
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

		const success = await deleteHomepageItem(id);
		if (!success) {
			return NextResponse.json(
				{ error: "Failed to delete item" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
