"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const supabase = createSupabaseBrowserClient();
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				setError(error.message);
				return;
			}

			router.push("/admin");
			router.refresh();
		} catch {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="w-full max-w-md p-8">
				<h1 className="text-4xl font-bold text-black text-center mb-2">
					LOKKOLUV
				</h1>
				<p className="text-center text-black/60 mb-8 tracking-widest text-sm">
					ADMIN
				</p>

				<form onSubmit={handleSubmit} className="space-y-6">
					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-black mb-2"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none text-black"
							placeholder="admin@lokkoluv.com"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-black mb-2"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-3 border border-black/20 focus:border-black focus:outline-none text-black"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 bg-black text-white font-medium tracking-widest hover:bg-black/80 disabled:bg-black/40 disabled:cursor-not-allowed transition-colors"
					>
						{loading ? "SIGNING IN..." : "SIGN IN"}
					</button>
				</form>
			</div>
		</div>
	);
}
