import { type NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getUser } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const formData = await request.formData();
		const file = formData.get("file") as File | null;
		const folder = (formData.get("folder") as string) || "gallery";

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Generate unique filename
		const ext = file.name.split(".").pop();
		const timestamp = Date.now();
		const randomStr = Math.random().toString(36).substring(7);
		const filename = `${folder}/${timestamp}-${randomStr}.${ext}`;

		// Convert file to buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Upload to Supabase Storage
		const { data, error } = await supabaseAdmin.storage
			.from("gallery-images")
			.upload(filename, buffer, {
				contentType: file.type,
				cacheControl: "3600",
				upsert: false,
			});

		if (error) {
			console.error("Upload error:", error);
			return NextResponse.json(
				{ error: "Failed to upload file" },
				{ status: 500 },
			);
		}

		// Get public URL
		const {
			data: { publicUrl },
		} = supabaseAdmin.storage.from("gallery-images").getPublicUrl(data.path);

		return NextResponse.json({
			url: publicUrl,
			path: data.path,
			filename: file.name,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ error: "Failed to process upload" },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest) {
	const user = await getUser();
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { searchParams } = new URL(request.url);
		const path = searchParams.get("path");

		if (!path) {
			return NextResponse.json({ error: "Path is required" }, { status: 400 });
		}

		const { error } = await supabaseAdmin.storage
			.from("gallery-images")
			.remove([path]);

		if (error) {
			console.error("Delete error:", error);
			return NextResponse.json(
				{ error: "Failed to delete file" },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Delete error:", error);
		return NextResponse.json(
			{ error: "Failed to process delete" },
			{ status: 500 },
		);
	}
}
