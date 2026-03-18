"use client";

import React from "react";
import { useCustomization } from "@/lib/context/CustomizationContext";

export default function CustomizePage() {
	const { config, updateConfig, resetConfig } = useCustomization();

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof config) => {
		updateConfig({ [key]: e.target.value });
	};

	return (
		<main className="min-h-screen bg-white p-8 md:p-16 flex flex-col items-center">
			<div className="w-full max-w-md bg-gray-50 border border-gray-200 p-8 shadow-sm">
				<h1 className="text-2xl font-bold tracking-widest text-black mb-8 border-b border-gray-300 pb-4">
					SITE CUSTOMIZATION
				</h1>

				<div className="space-y-6">
					<div className="flex flex-col space-y-2">
						<label htmlFor="primaryColor" className="text-sm font-semibold tracking-wider text-gray-700">
							PRIMARY COLOR
						</label>
						<div className="flex items-center gap-4">
							<input
								type="color"
								id="primaryColor"
								value={config.primaryColor}
								onChange={(e) => handleColorChange(e, "primaryColor")}
								className="w-12 h-12 p-1 bg-white border border-gray-300 cursor-pointer"
							/>
							<span className="font-mono text-sm text-gray-600">{config.primaryColor}</span>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<label htmlFor="backgroundColor" className="text-sm font-semibold tracking-wider text-gray-700">
							BACKGROUND COLOR
						</label>
						<div className="flex items-center gap-4">
							<input
								type="color"
								id="backgroundColor"
								value={config.backgroundColor}
								onChange={(e) => handleColorChange(e, "backgroundColor")}
								className="w-12 h-12 p-1 bg-white border border-gray-300 cursor-pointer"
							/>
							<span className="font-mono text-sm text-gray-600">{config.backgroundColor}</span>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<label htmlFor="textColor" className="text-sm font-semibold tracking-wider text-gray-700">
							TEXT COLOR
						</label>
						<div className="flex items-center gap-4">
							<input
								type="color"
								id="textColor"
								value={config.textColor}
								onChange={(e) => handleColorChange(e, "textColor")}
								className="w-12 h-12 p-1 bg-white border border-gray-300 cursor-pointer"
							/>
							<span className="font-mono text-sm text-gray-600">{config.textColor}</span>
						</div>
					</div>

					<div className="pt-8 flex justify-end">
						<button
							type="button"
							onClick={resetConfig}
							className="px-6 py-2 bg-black text-white font-bold tracking-widest text-sm hover:bg-gray-800 transition-colors"
						>
							RESET DEFAULTS
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
