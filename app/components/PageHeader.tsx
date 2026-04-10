import Link from "next/link";

interface PageHeaderProps {
	subtitle?: string;
}

export default function PageHeader({ subtitle }: PageHeaderProps) {
	return (
		<header className="pt-24 pb-20 text-center md:pt-28 md:pb-24">
			<Link href="/">
				<h1 className="font-extrabold text-[clamp(3rem,10vw,9rem)] text-ink">
					LOKKOLUV
				</h1>
			</Link>
			{subtitle && (
				<h2 className="font-medium text-[clamp(1.875rem,4.5vw,3rem)] tracking-[0.3em] text-ink mt-2">
					{subtitle}
				</h2>
			)}
		</header>
	);
}
