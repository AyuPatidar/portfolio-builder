import { education } from "@/constants";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Landmark } from "lucide-react";

const Education = () => {
	return (
		<section
			id="education"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				<span className="text-primary">Education</span>
			</h2>
			<ol className={"flex flex-col relative w-full mx-auto gap-4"}>
				{education.map((ed, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: index * 0.1,
							ease: "easeOut",
						}}
					>
						<li className={"relative mb-8 last:mb-0"}>
							<div className="grid grid-cols-[auto_auto_1fr] md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
								{/* Period */}
								<div className="flex justify-end items-center pt-3">
									<p
										className={
											"text-xs md:text-sm font-medium tracking-tight text-secondary-foreground"
										}
									>
										{ed.period}
									</p>
								</div>

								{/* Timeline dot and connector */}
								<div className="flex h-full flex-col items-center">
									<div className="relative z-10">
										<div
											className={
												"relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm h-10 w-10 md:h-12 md:w-12 bg-primary text-primary-foreground"
											}
										>
											<div
												className={
													"flex items-center justify-center h-5 w-5 md:h-6 md:w-6"
												}
											>
												{ed.college ? <GraduationCap /> : <Landmark />}
											</div>
										</div>
									</div>
									{index !== education.length - 1 && (
										<div className="min-h-12 h-full w-0.5 mt-2 bg-primary" />
									)}
								</div>

								{/* Card */}
								<div className={"md:w-1/2 flex flex-col gap-2 pt-3 md:pt-2"}>
									<div className={"flex flex-col"}>
										<h3 className="font-semibold text-base md:text-lg leading-none text-secondary-foreground">
											{ed.school || ed.college}
										</h3>
										<p className="text-sm md:text-base">
											{ed.degree || ed.grade}
										</p>
									</div>
									<div>
										<p className="text-xs md:text-sm">CGPA: {ed.cgpa}</p>
										<p className="text-xs md:text-sm text-wrap">
											{ed.coursework && "Coursework: "}
											{ed.coursework &&
												ed.coursework.map((cw, index) => (
													<span key={index}>
														{index != 0 && ", "}
														{cw}
													</span>
												))}
										</p>
									</div>
								</div>
							</div>
						</li>
					</motion.div>
				))}
			</ol>
		</section>
	);
};

export default Education;
