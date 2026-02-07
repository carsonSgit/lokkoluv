"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ href: "/admin", label: "Dashboard", icon: "📊" },
	{ href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
	{ href: "/admin/content", label: "Content", icon: "📝" },
	{ href: "/admin/homepage", label: "Homepage", icon: "🏠" },
	{ href: "/admin/theme", label: "Theme", icon: "🎨" },
	{ href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="fixed inset-y-0 left-0 z-50 w-64 bg-black text-white transform -translate-x-full lg:translate-x-0 transition-transform">
			<div className="flex flex-col h-full">
				<div className="p-6 border-b border-white/10">
					<Link href="/admin">
						<h1 className="text-2xl font-bold tracking-wider">LOKKOLUV</h1>
						<p className="text-xs text-white/60 tracking-widest mt-1">ADMIN</p>
					</Link>
				</div>

				<nav className="flex-1 p-4 space-y-1">
					{navItems.map((item) => {
						const isActive =
							item.href === "/admin"
								? pathname === "/admin"
								: pathname.startsWith(item.href);

						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
									isActive
										? "bg-white text-black"
										: "text-white/70 hover:bg-white/10 hover:text-white"
								}`}
							>
								<span className="text-lg">{item.icon}</span>
								<span className="font-medium">{item.label}</span>
							</Link>
						);
					})}
				</nav>

				<div className="p-4 border-t border-white/10">
					<Link
						href="/"
						target="_blank"
						className="flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white transition-colors"
					>
						<span className="text-lg">🌐</span>
						<span className="font-medium">View Site</span>
					</Link>
				</div>
			</div>
		</aside>
	);
}
