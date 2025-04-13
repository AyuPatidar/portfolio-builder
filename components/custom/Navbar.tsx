"use client";
import React, { useEffect, useState } from "react";
import ThemeButton from "./ThemeButton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { tangerine } from "@/app/page";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { Download, Menu, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { usePathname } from "next/navigation";

const Navbar = () => {
	const pathname = usePathname();
	const { data: session } = useSession();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const navLinks = [
		{ name: "About", href: "#about" },
		{ name: "Skills", href: "#skills" },
		{ name: "Experience", href: "#experience" },
		{ name: "Projects", href: "#projects" },
		{ name: "Education", href: "#education" },
		{ name: "Activity", href: "#activity" },
		{ name: "Contact", href: "#contact" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-md ${
				isScrolled ? "border-b" : ""
			}`}
		>
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* left part */}
					<Link href={"/ayushpatidar755"}>
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-full overflow-hidden">
								{session?.user?.image ? (
									<Image
										src={session?.user?.image}
										alt="User Avatar"
										width={40}
										height={40}
										className="object-cover"
										loading="lazy"
									/>
								) : (
									<Skeleton className="w-10 h-10 rounded-full bg-secondary" />
								)}
							</div>
							<h1
								className={`text-4xl font-bold text-primary ${tangerine.className}`}
							>
								Ayush Patidar
							</h1>
						</div>
					</Link>

					<div className="flex items-center gap-2 lg:gap-6">
						{/* Desktop Menu */}
						{pathname === "/ayushpatidar755" && (
							<nav className="hidden lg:flex items-center gap-6">
								{navLinks.map(link => (
									<Link
										href={link.href}
										key={link.href}
										className={`font-medium text-muted-foreground hover:text-primary`}
									>
										{link.name}
									</Link>
								))}
								<Link
									href={"/Resume.pdf"}
									download={"AyushPatidar"}
									target="_blank"
								>
									<Button
										variant={"default"}
										size={"sm"}
										className="gap-2 text-sm [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
									>
										<Download />
										Resume
									</Button>
								</Link>
							</nav>
						)}
						{/* Mobile Menu */}
						{pathname === "/ayushpatidar755" && (
							<Button
								variant={"ghost"}
								size={"icon"}
								className="lg:hidden [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								{isMobileMenuOpen ? <X /> : <Menu />}
							</Button>
						)}
						<div>
							<ThemeButton />
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Menu Animations */}
			{pathname === "/ayushpatidar755" && (
				<AnimatePresence>
					{isMobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, y: -20, height: 0, scaleY: 0.5 }}
							animate={{ opacity: 1, y: 0, height: "auto", scaleY: 1 }}
							exit={{ opacity: 0, y: 20, height: 0, scaleY: 0.5 }}
							transition={{ duration: 0.5 }}
							className="lg:hidden border-t bg-background"
						>
							<nav className="container mx-auto p-4 flex flex-col gap-4">
								{navLinks.map(link => (
									<Link
										href={link.href}
										key={link.href}
										className="text-sm font-medium text-muted-foreground hover:text-primary"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										{link.name}
									</Link>
								))}
								<Link
									href={"/Resume.pdf"}
									download={"AyushPatidar"}
									target="_blank"
								>
									<Button
										variant={"default"}
										size={"sm"}
										className="gap-2 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
									>
										<Download />
										Resume
									</Button>
								</Link>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</header>
	);
};

export default Navbar;
