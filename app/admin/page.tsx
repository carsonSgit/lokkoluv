import Link from "next/link";

const quickActions = [
	{
		title: "Gallery",
		description: "Manage artwork pieces",
		href: "/admin/gallery",
		icon: "🖼️",
	},
	{
		title: "Content",
		description: "Edit text content",
		href: "/admin/content",
		icon: "📝",
	},
	{
		title: "Homepage",
		description: "Configure sections",
		href: "/admin/homepage",
		icon: "🏠",
	},
	{
		title: "Theme",
		description: "Fonts & colors",
		href: "/admin/theme",
		icon: "🎨",
	},
	{
		title: "Settings",
		description: "Social links & contact",
		href: "/admin/settings",
		icon: "⚙️",
	},
];

export default function AdminDashboardPage() {
	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold text-black">Dashboard</h1>
				<p className="text-gray-600 mt-1">
					Welcome to the LOKKOLUV admin panel
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{quickActions.map((action) => (
					<Link
						key={action.href}
						href={action.href}
						className="block p-6 bg-white border border-gray-200 hover:border-black rounded-lg transition-colors group"
					>
						<div className="flex items-start gap-4">
							<span className="text-3xl">{action.icon}</span>
							<div>
								<h2 className="text-xl font-semibold text-black group-hover:underline">
									{action.title}
								</h2>
								<p className="text-gray-600 mt-1">{action.description}</p>
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className="bg-white border border-gray-200 rounded-lg p-6">
				<h2 className="text-xl font-semibold text-black mb-4">Quick Tips</h2>
				<ul className="space-y-3 text-gray-600">
					<li className="flex items-start gap-2">
						<span className="text-green-500 mt-0.5">✓</span>
						<span>
							Use <strong>Gallery</strong> to add, edit, or reorder artwork
							pieces
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-500 mt-0.5">✓</span>
						<span>
							Use <strong>Content</strong> to update your about page and other
							text
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-500 mt-0.5">✓</span>
						<span>
							Use <strong>Homepage</strong> to show/hide sections and manage
							items
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-500 mt-0.5">✓</span>
						<span>
							Use <strong>Theme</strong> to customize fonts and colors
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="text-green-500 mt-0.5">✓</span>
						<span>
							Changes are saved automatically but use Preview before publishing
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
