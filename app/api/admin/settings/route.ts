import { type NextRequest, NextResponse } from "next/server";
import { getSiteSettings, updateSiteSettings } from "@/lib/admin/settings";
import { getUser } from "@/lib/supabase-server";

export async function GET() {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const settings = await getSiteSettings();
	return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();
		const settings = await updateSiteSettings(body);

		if (!settings) {
			return NextResponse.json(
				{ error: "Failed to update settings" },
				{ status: 500 },
			);
		}

		return NextResponse.json(settings);
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
