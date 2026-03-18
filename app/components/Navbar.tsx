"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [worksExpanded, setWorksExpanded] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const navRef = useRef<HTMLElement>(null);
	const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setIsOpen(false);
				setWorksExpanded(false);
			}
		};

		if (isOpen) {
			document.addEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isOpen]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (dropdownTimeoutRef.current) {
				clearTimeout(dropdownTimeoutRef.current);
			}
		};
	}, []);

	const handleDropdownEnter = () => {
		if (dropdownTimeoutRef.current) {
			clearTimeout(dropdownTimeoutRef.current);
		}
		setShowDropdown(true);
	};

	const handleDropdownLeave = () => {
		dropdownTimeoutRef.current = setTimeout(() => {
			setShowDropdown(false);
		}, 150);
	};

	return (
		<nav ref={navRef} className="absolute top-0 left-0 right-0 z-50">
			<div className="max-w-[90%] mx-auto px-4 pt-6 md:pt-[1.75rem]">
				<div className="flex justify-between items-center">
					{/* HOME link - only shown on subpages, desktop only */}
					{!isHomePage ? (
						<Link
							href="/"
							className="hidden md:flex text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none cursor-pointer transition-colors min-h-[44px] items-center"
						>
							HOME
						</Link>
					) : (
						<div className="hidden md:block" />
					)}

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-16">
						{/* WORKS with Dropdown */}
						{/* biome-ignore lint/a11y/noStaticElementInteractions: Hover container for dropdown - keyboard navigation handled by inner button */}
						<div
							className="relative"
							onMouseEnter={handleDropdownEnter}
							onMouseLeave={handleDropdownLeave}
						>
							<button
								type="button"
								className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none cursor-pointer transition-colors h-[44px] flex items-center"
							>
								WORKS
							</button>

							{/* Dropdown Menu */}
							<div
								className={`absolute top-full left-0 mt-2 bg-white border border-black transition-all duration-200 ${
									showDropdown
										? "opacity-100 translate-y-0 pointer-events-auto"
										: "opacity-0 -translate-y-2 pointer-events-none"
								}`}
								style={{ borderRadius: 0 }}
							>
								<Link
									href="/works/behoben"
									className="block px-6 py-3 text-black text-sm tracking-[0.2em] font-bold hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white focus-visible:outline-none transition-colors whitespace-nowrap cursor-pointer min-h-[44px] flex items-center"
								>
									BEHOBEN
								</Link>
							</div>
						</div>

						<Link
							href="/about"
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none cursor-pointer transition-colors h-[44px] flex items-center"
						>
							ABOUT
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden ml-auto flex flex-col justify-center items-center w-12 h-12 gap-1.5 group cursor-pointer focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 -mr-2"
						aria-label="Toggle menu"
						aria-expanded={isOpen}
					>
						<span
							className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ease-out ${
								isOpen ? "rotate-45 translate-y-[7.5px]" : ""
							}`}
						/>
						<span
							className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ease-out ${
								isOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ease-out ${
								isOpen ? "-rotate-45 -translate-y-[7.5px]" : ""
							}`}
						/>
					</button>
				</div>

				{/* Mobile Dropdown */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
						isOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
					}`}
				>
					<div className="flex flex-col items-end gap-2 py-4 bg-white/95 backdrop-blur-sm">
						{/* WORKS with expandable submenu */}
						<button
							type="button"
							onClick={() => setWorksExpanded(!worksExpanded)}
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none flex justify-end items-center gap-2 cursor-pointer transition-colors min-h-[48px] w-full pr-2"
							aria-expanded={worksExpanded}
						>
							WORKS
							<span
								className={`transition-transform duration-200 ${
									worksExpanded ? "rotate-180" : ""
								}`}
							>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
								>
									<path
										d="M2 4L6 8L10 4"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</button>

						{/* WORKS submenu */}
						<div
							className={`overflow-hidden transition-all duration-200 w-full flex flex-col items-end ${
								worksExpanded ? "max-h-20 opacity-100 mb-2" : "max-h-0 opacity-0 mb-0"
							}`}
						>
							<Link
								href="/works/behoben"
								onClick={() => {
									setIsOpen(false);
									setWorksExpanded(false);
								}}
								className="text-black text-sm tracking-[0.2em] font-bold hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none cursor-pointer transition-colors min-h-[44px] flex items-center pr-6"
							>
								BEHOBEN
							</Link>
						</div>

						<Link
							href="/about"
							onClick={() => setIsOpen(false)}
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4 focus-visible:underline focus-visible:outline-none cursor-pointer transition-colors min-h-[48px] flex items-center w-full justify-end pr-2"
						>
							ABOUT
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
}
