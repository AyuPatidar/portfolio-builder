"use client";
import { GitCommit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "../ui/tooltip";

interface SubmissionDaysEntity {
	submissionCount: number;
	weekday: number;
	date: string;
}
interface Week {
	weekStartDate: string;
	submissionDays: SubmissionDaysEntity[];
}
interface MonthEntity {
	month: string;
	weeks: Week[];
}
interface ISubmissionCalendar {
	totalSubmissions: number;
	maxSubmissionsInOneDay: number;
	minSubmissionsInOneDay: number;
	months?: MonthEntity[] | null;
}

const LeetStats = () => {
	const [leetStats, setLeetStats] = useState<ISubmissionCalendar | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLeetStats = async () => {
			try {
				const response = await fetch(`/api/leetcode?username=ayushpatidar755`);

				if (!response.ok)
					throw new Error(`Error fetching data: ${response.statusText}`);

				const data = await response.json();
				setLeetStats(data);
			} catch (error) {
				setError("Failed to fetch leetcode stats");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchLeetStats();
	}, []);

	const getSubmissionLevel = (submissionCount: number) => {
		if (!leetStats || submissionCount === 0) return "bg-muted-foreground/40";
		const { maxSubmissionsInOneDay: maxSub, minSubmissionsInOneDay: minSub } =
			leetStats;
		const percentage = (submissionCount * 100) / (maxSub - minSub);
		if (percentage <= 20) return "bg-green-300 dark:bg-green-700";
		if (percentage <= 40) return "bg-green-400 dark:bg-green-600";
		if (percentage <= 60) return "bg-green-500 dark:bg-green-500";
		if (percentage <= 80) return "bg-green-600 dark:bg-green-400";
		return "bg-green-700 dark:bg-green-300";
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

	if (!leetStats) return null;

	return (
		<section
			id="activity"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				<span className="text-primary">LeetCode</span> Activity
			</h2>
			<div>
				<div className="w-full space-y-4">
					<div className="flex items-center gap-2">
						<div className="rounded-full bg-primary/10 p-1">
							<GitCommit />
						</div>
						{leetStats.totalSubmissions} submissions in the last year
					</div>
					<div className="bg-secondary/60 py-3 px-6 w-full rounded-lg">
						<ScrollArea className="rounded-lg">
							<div className={`flex justify-between gap-[8] py-3`}>
								{leetStats.months?.map((month, monthIndex) => (
									<div
										key={monthIndex}
										className="space-y-1"
									>
										<div className="flex gap-[2]">
											{month.weeks.map((week, weekIndex) => (
												<div
													key={weekIndex}
													className={`flex flex-col gap-[2] ${
														week.weekStartDate === week.submissionDays[0].date
															? "justify-start"
															: "justify-end"
													}`}
												>
													{week.submissionDays.map((day, dayIndex) => (
														<TooltipProvider
															key={dayIndex}
															delayDuration={0}
														>
															<Tooltip>
																<TooltipTrigger>
																	<div
																		className={cn(
																			"w-[10] h-[10] rounded-[3]",
																			getSubmissionLevel(day.submissionCount)
																		)}
																	></div>
																</TooltipTrigger>
																<TooltipContent className="bg-secondary-foreground text-secondary">
																	{day.submissionCount > 0
																		? day.submissionCount
																		: "No"}{" "}
																	{day.submissionCount === 1
																		? "submission"
																		: "submissions"}{" "}
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
			<pre>{JSON.stringify(leetStats, null, 4)}</pre>
		</section>
	);
};

export default LeetStats;
