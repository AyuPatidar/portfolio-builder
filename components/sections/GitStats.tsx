"use client";
import { GitCommit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

interface Week {
	weekStartDate: string;
	contributionDays: ContributionDaysEntity[];
}
interface MonthEntity {
	month: string;
	weeks: Week[];
}
interface IContributionCalendar {
	totalContributions: number;
	months?: MonthEntity[] | null;
}
interface ContributionDaysEntity {
	contributionLevel: string;
	contributionCount: number;
	weekday: number;
	date: string;
}

const GitStats = () => {
	const [gitStats, setGitStats] = useState<IContributionCalendar | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchGithub = async () => {
			try {
				const res = await fetch(`/api/github?username=AyuPatidar`);

				if (!res.ok) throw new Error(`Error fetching data: ${res.statusText}`);

				const data = await res.json();
				setGitStats(data);
			} catch (error) {
				setError("Failed to fetch github stats");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchGithub();
	}, []);

	const getContributionLevel = (contributionLevel: string) => {
		if (contributionLevel === "FIRST_QUARTILE") return "bg-[#9be9a8]";
		if (contributionLevel === "SECOND_QUARTILE") return "bg-[#40c463]";
		if (contributionLevel === "THIRD_QUARTILE") return "bg-[#30a14e]";
		if (contributionLevel === "FOURTH_QUARTILE") return "bg-[#216e39]";
		return "bg-muted-foreground/40";
	};

	if (loading)
		return (
			<section
				id="activity"
				className="container mx-auto px-4 py-8 md:py-20"
			>
				<Skeleton className="w-full h-[100]"></Skeleton>
			</section>
		);

	if (error)
		return (
			<Card className="p-4 sm:p-6 bg-card border-border/5">
				<p className="text-destructive">{error}</p>
			</Card>
		);

	if (!gitStats) return null;

	return (
		<section
			id="activity"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				<span className="text-primary">Github</span> Activity
			</h2>
			<div>
				<div className="w-full space-y-4">
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-primary/10 p-1">
							<GitCommit />
						</div>
						{gitStats.totalContributions} contributions in the last year
					</div>
					<div className="bg-secondary/60 py-3 px-6 w-full rounded-lg">
						<ScrollArea className="rounded-lg">
							<div className={`flex justify-between gap-[8] py-3`}>
								{gitStats.months?.map((month, monthIndex) => (
									<div
										key={monthIndex}
										className="space-y-1"
									>
										<div className="flex gap-[2]">
											{month.weeks.map((week, weekIndex) => (
												<div
													key={weekIndex}
													className={`flex flex-col gap-[2] ${
														week.weekStartDate === week.contributionDays[0].date
															? "justify-start"
															: "justify-end"
													}`}
												>
													{week.contributionDays.map((day, dayIndex) => (
														<TooltipProvider
															key={dayIndex}
															delayDuration={0}
														>
															<Tooltip>
																<TooltipTrigger>
																	<div
																		className={cn(
																			"w-[10] h-[10] rounded-[3]",
																			getContributionLevel(
																				day.contributionLevel
																			)
																		)}
																	></div>
																</TooltipTrigger>
																<TooltipContent className="bg-secondary-foreground text-secondary">
																	{day.contributionCount > 0
																		? day.contributionCount
																		: "No"}{" "}
																	{day.contributionCount === 1
																		? "contribution"
																		: "contributions"}{" "}
																	on{" "}
																	{new Date(day.date).toLocaleString(
																		"default",
																		{
																			day: "numeric",
																			month: "long",
																			year: "numeric",
																		}
																	)}
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													))}
												</div>
											))}
										</div>
										{month.weeks.length > 2 && (
											<p className="text-center text-sm font-light">
												{month.month.slice(0, 3)}
											</p>
										)}
									</div>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GitStats;
