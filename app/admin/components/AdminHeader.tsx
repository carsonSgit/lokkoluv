"use client";

import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

interface AdminHeaderProps {
	user: User;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
	const router = useRouter();

	const handleSignOut = async () => {
		const supabase = createSupabaseBrowserClient();
		await supabase.auth.signOut();
		router.push("/admin/login");
		router.refresh();
	};

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="lg:hidden">
					<button
						type="button"
						className="p-2 text-gray-600 hover:text-black"
						aria-label="Toggle menu"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>

				<div className="flex items-center gap-4 ml-auto">
					<span className="text-sm text-gray-600">{user.email}</span>
					<button
						onClick={handleSignOut}
						type="button"
						className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black border border-gray-300 hover:border-black rounded transition-colors"
					>
						Sign Out
					</button>
				</div>
			</div>
		</header>
	);
}
