import { type NextRequest, NextResponse } from "next/server";
import {
	getAvailableFonts,
	getThemeSettings,
	publishTheme,
	updateThemeSettings,
} from "@/lib/admin/theme";
import { getUser } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const { searchParams } = new URL(request.url);
	const type = searchParams.get("type");

	if (type === "fonts") {
		const fonts = await getAvailableFonts();
		return NextResponse.json(fonts);
	}

	const theme = await getThemeSettings();
	return NextResponse.json(theme);
}

export async function PUT(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = await request.json();

		// Handle publish action
		if (body.action === "publish") {
			const success = await publishTheme();
			if (!success) {
				return NextResponse.json(
					{ error: "Failed to publish theme" },
					{ status: 500 },
				);
			}
			return NextResponse.json({ success: true });
		}

		// Update theme settings
		const theme = await updateThemeSettings(body);
		if (!theme) {
			return NextResponse.json(
				{ error: "Failed to update theme" },
				{ status: 500 },
			);
		}

		return NextResponse.json(theme);
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}
}
