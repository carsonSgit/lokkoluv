import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getImageUrl(filename: string): string {
	const baseUrl = supabaseUrl.replace(/\/$/, "");
	return `${baseUrl}/storage/v1/object/public/behoben/${filename}`;
}
