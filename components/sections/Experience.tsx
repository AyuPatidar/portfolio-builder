import React, { useEffect, useState } from "react";
import { experience } from "@/constants";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

const Experience = () => {
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<section
			id="experience"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				Industry <span className="text-primary">Experience</span>
			</h2>
			<Tabs defaultValue={"0"}>
				<ScrollArea className="w-full bg-accent rounded-t-lg">
					<TabsList className="h-full p-2 flex justify-around items-center">
						{experience.map((exp, index) => (
							<TabsTrigger
								value={index.toString()}
								key={index}
								className={`px-2 md:px-8 text-sm md:text-base font-bold data-[state=active]:text-primary`}
							>
								{windowWidth > 768 && exp.jobDesignation + " @ "}
								{exp.company}
							</TabsTrigger>
						))}
					</TabsList>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				{experience.map((exp, index) => (
					<TabsContent
						value={index.toString()}
						key={index}
					>
						<Card className="bg-card rounded-none rounded-b-lg hover:shadow-xl transition-shadow duration-300">
							<CardHeader className="rounded-none space-y-0">
								<CardTitle className="text-lg text-primary font-extrabold">
									{exp.jobDesignation} @ {exp.company}
								</CardTitle>
								<CardDescription className="flex justify-between text-base">
									<p>{exp.location}</p>
									<p>{exp.period}</p>
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-2">
								<div className="flex">
									<h6 className="w-28 flex-none">Skills Utilized: </h6>
									<div className="flex flex-wrap gap-2">
										{exp.skills.map((skill, index) => (
											<Badge
												key={index}
												variant={"secondary"}
												className="text-sm bg-secondary"
											>
												{skill}
											</Badge>
										))}
									</div>
								</div>
								<div>
									Responsibilities
									{exp.responsibilities.map((resp, index) => (
										<div key={index}>◦ {resp}</div>
									))}
								</div>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</section>
	);
};

export default Experience;
