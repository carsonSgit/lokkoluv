"use client";

import { useState, useEffect, useRef } from "react";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const navRef = useRef<HTMLElement>(null);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<nav ref={navRef} className="absolute top-0 left-0 right-0 z-50">
			<div className="max-w-[90%] mx-auto px-4 pt-6 md:pt-[1.75rem]">
				<div className="flex justify-end items-start">
					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-16">
						<a
							href="#works"
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4"
						>
							WORKS
						</a>
						<a
							href="#about"
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4"
						>
							ABOUT
						</a>
					</div>

					{/* Mobile Menu Button */}
					<button
						type="button"
						onClick={() => setIsOpen(!isOpen)}
						className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
						aria-label="Toggle menu"
					>
						<span
							className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ease-out ${
								isOpen ? "rotate-45 translate-y-[7px]" : ""
							}`}
						/>
						<span
							className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ease-out ${
								isOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`block w-6 h-[1.5px] bg-black transition-all duration-300 ease-out ${
								isOpen ? "-rotate-45 -translate-y-[7px]" : ""
							}`}
						/>
					</button>
				</div>

				{/* Mobile Dropdown */}
				<div
					className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
						isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<div className="flex flex-col items-end gap-6 pt-8 pb-4 bg-white">
						<a
							href="#works"
							onClick={() => setIsOpen(false)}
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4"
						>
							WORKS
						</a>
						<a
							href="#about"
							onClick={() => setIsOpen(false)}
							className="text-black text-md tracking-[0.2em] font-bold hover:underline underline-offset-4"
						>
							ABOUT
						</a>
					</div>
				</div>
			</div>
		</nav>
	);
}
