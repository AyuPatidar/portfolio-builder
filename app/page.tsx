"use client";
import { Tangerine } from "next/font/google";
import ThemeButton from "@/components/custom/ThemeButton";
import Image from "next/image";
import { Check } from "lucide-react";
import AuthButton from "@/components/custom/AuthButton";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export const tangerine = Tangerine({
	weight: ["700"],
	subsets: ["latin"],
});

export default function Home() {
	const { data: session } = useSession();
	const { name } = sessionStorage.user;
	const showcase = ["Projects", "Skills", "Experience"];
	return (
		<div className="w-full h-screen">
			<nav className="flex p-4 w-full justify-end">
				<ThemeButton />
			</nav>

			<main
				style={{ height: "calc(100% - 100px)" }}
				className={`grid grid-cols-1 md:grid-cols-2 mx-auto w-11/12 max-w-[1080] items-center justify-items-center`}
			>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.35 }}
					className="mx-auto h-full flex flex-col justify-center space-y-8"
				>
					<div className="space-y-2">
						<h1 className="text-2xl md:text-3xl font-semibold">
							{name ? (
								<span>
									Welcome{" "}
									<span
										className={`${tangerine.className} text-5xl md:text-6xl text-primary`}
									>
										{name}
									</span>
								</span>
							) : (
								<span>
									<span
										className={`${tangerine.className} text-5xl md:text-6xl text-primary`}
									>
										Portfolio Builder
									</span>{" "}
									<span className="hidden md:flex">(For programmers)</span>
								</span>
							)}
						</h1>
						<p className="text-2xl">
							Create your own portfolio just by filling some forms.
						</p>
						<div className="space-y-0.5">
							<p>Harness the power of portfolio builder to showcase your</p>
							<ul className="list-disc list-inside space-y-0.5">
								{showcase.map((item, index) => (
									<li
										className="flex gap-2 items-center"
										key={index}
									>
										<Check className="text-primary" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
					<div>
						<AuthButton />
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 1, delay: 0.35 }}
					className="p-8 flex justify-center items-center"
				>
					<Image
						src={"/website.svg"}
						alt={"portfolio website"}
						width={400}
						height={400}
						loading="lazy"
					/>
				</motion.div>
			</main>
		</div>
	);
}
