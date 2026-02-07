import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let _client: SupabaseClient | null = null;

/**
 * Lazily create and return the admin Supabase client.
 * Uses the service role key for full database access - server-side only.
 * Returns null if env vars are missing (e.g., during static build).
 */
function getClient(): SupabaseClient | null {
	if (_client) return _client;

	if (!supabaseUrl || !supabaseServiceRoleKey) {
		return null;
	}

	_client = createClient(supabaseUrl, supabaseServiceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	return _client;
}

/**
 * Proxy object that lazily creates the admin client on first property access.
 * This prevents build-time errors when env vars aren't available.
 * All admin lib functions wrap calls in try/catch, so null access falls back gracefully.
 */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
	get(_target, prop) {
		const client = getClient();
		if (!client) {
			throw new Error(
				"Supabase admin client not available (missing env vars)",
			);
		}
		const value = client[prop as keyof SupabaseClient];
		if (typeof value === "function") {
			return value.bind(client);
		}
		return value;
	},
});
