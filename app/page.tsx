"use client";
import { Tangerine } from "next/font/google";
import ThemeButton from "@/components/custom/ThemeButton";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const tangerine = Tangerine({
	weight: ["700"],
	subsets: ["latin"],
});

export default function Home() {
	const showcase = ["Projects", "Skills", "Experience"];
	return (
		<div className="w-full h-screen">
			<nav className="flex p-4 w-full justify-end">
				<ThemeButton />
			</nav>

			<main
				style={{ height: "calc(100% - 100px)" }}
				className={`flex items-center justify-center mx-auto max-w-[1080] space-x-16`}
			>
				<div>
					<h1>Welcome to Portfolio Builder(For programmers)</h1>
					<p>Create your own portfolio just by filling some forms</p>
					<p>You can harness the power of portfolio builder to showcase your</p>
					<ul>
						{showcase.map((item, index) => (
							<li
								className="flex"
								key={index}
							>
								<Check className="text-primary" />
								{item}
							</li>
						))}
					</ul>
					<Button></Button>
				</div>
				<Image
					src={"/portfolio.svg"}
					alt={"portfolio"}
					width={400}
					height={400}
				/>
			</main>
		</div>
	);
}
