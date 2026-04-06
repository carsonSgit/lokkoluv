import { getUser } from "@/lib/supabase-server";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUser();

	// No user (e.g., login page) — render children without dashboard chrome.
	// Auth-protected routes are guarded by middleware, not this layout.
	if (!user) {
		return <>{children}</>;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<AdminSidebar />
			<div className="lg:pl-64">
				<AdminHeader user={user} />
				<main className="p-6">{children}</main>
			</div>
		</div>
	);
}
