import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	let supabaseResponse = NextResponse.next({
		request,
	});

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value } of cookiesToSet) {
						request.cookies.set(name, value);
					}
					supabaseResponse = NextResponse.next({
						request,
					});
					for (const { name, value, options } of cookiesToSet) {
						supabaseResponse.cookies.set(name, value, options);
					}
				},
			},
		},
	);

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const isAuthenticated = !error && !!user;

	// Debug logging - remove after fixing
	console.log(
		`[middleware] ${pathname} | auth=${isAuthenticated} | user=${!!user} | error=${error?.message || "none"}`,
	);

	// Login page: only redirect if truly authenticated
	if (pathname === "/admin/login") {
		if (isAuthenticated) {
			return NextResponse.redirect(new URL("/admin", request.url));
		}
		// Not authenticated - show login page
		return supabaseResponse;
	}

	// All other /admin routes: require authentication
	if (!isAuthenticated) {
		const loginUrl = new URL("/admin/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return supabaseResponse;
}

export const config = {
	matcher: ["/admin/:path*"],
};
