import { NextResponse } from "next/server";
import { defaultTheme } from "@/lib/fallbacks/theme";
import { supabase } from "@/lib/supabase";

export async function GET() {
	// Public route - no auth required
	try {
		if (!supabase) {
			return NextResponse.json(defaultTheme);
		}

		const { data, error } = await supabase
			.from("theme_settings")
			.select("*")
			.eq("is_published", true)
			.limit(1)
			.single();

		if (error || !data) {
			return NextResponse.json(defaultTheme);
		}

		return NextResponse.json(data);
	} catch {
		return NextResponse.json(defaultTheme);
	}
}
