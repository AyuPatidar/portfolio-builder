"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
	return (
		<section className="container mx-auto px-4 pt-32 pb-20">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 className="text-4xl md:text-6xl font-bold mb-6">
						Hi, I'm <span className={`text-primary`}>Ayush Patidar</span>
					</h1>
					<p className="text-xl md:text-2xl mb-8 text-muted-foreground">
						A Software Engineer
						<br />A Full Stack Developer
					</p>
					<div className="flex gap-4">
						<Button
							variant={"default"}
							size={"lg"}
							className="gap-2 theme-transition"
						>
							<Mail className="w-4 h-4" />
							Contact Me
						</Button>
						<Link
							href={"https://github.com/AyuPatidar"}
							target="_blank"
						>
							<Button
								variant={"outline"}
								className="gap-2 theme-transition"
							>
								<Github className="w-4 h-4" />
								Github
							</Button>
						</Link>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="flex justify-center"
				>
					<Image
						src={"/programming.svg"}
						alt={"Developer"}
						width={500}
						height={500}
						priority
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
