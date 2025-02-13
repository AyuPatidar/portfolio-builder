import React from "react";
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

const Experience = () => {
	return (
		<section
			id="experience"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				Industry <span className="text-primary">Experience</span>
			</h2>
			<Tabs defaultValue={"0"}>
				<TabsList className="h-full flex justify-around items-center w-full overflow-x-scroll scrollbar-none">
					{experience.map((exp, index) => (
						<TabsTrigger
							value={index.toString()}
							key={index}
							className={`px-2 md:px-8 text-sm md:text-base font-bold data-[state=active]:text-primary`}
						>
							{window.innerWidth > 768 && exp.jobDesignation + " @ "}
							{exp.company}
						</TabsTrigger>
					))}
				</TabsList>
				{experience.map((exp, index) => (
					<TabsContent
						value={index.toString()}
						key={index}
					>
						<Card className="bg-card hover:shadow-xl transition-shadow duration-300">
							<CardHeader className="space-y-0">
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
