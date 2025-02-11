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
						<Link href={"mailto:ayushpatidar755@gmail.com"}>
							<Button
								variant={"default"}
								size={"lg"}
								className="gap-2 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
							>
								<Mail />
								Contact Me
							</Button>
						</Link>
						<Link
							href={"https://github.com/AyuPatidar"}
							target="_blank"
						>
							<Button
								variant={"outline"}
								size={"lg"}
								className="gap-2 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
							>
								<Github />
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
