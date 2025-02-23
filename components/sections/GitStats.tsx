"use client";
import { GitCommit } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { Card } from "../ui/card";

export interface IContributionCalendar {
	totalContributions: number;
	weeks?: WeeksEntity[] | null;
}
export interface WeeksEntity {
	contributionDays?: ContributionDaysEntity[] | null;
}
export interface ContributionDaysEntity {
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
		return "bg-[#ebedf0]";
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
				{gitStats && (
					<div className="w-full space-y-4">
						<div className="flex items-center gap-2">
							<div className="rounded-full bg-primary/10 p-1">
								<GitCommit />
							</div>
							{gitStats.totalContributions} contributions in the last year
						</div>
						<ScrollArea className="rounded-md">
							<div className={`flex justify-center bg-accent p-4 gap-2`}>
								{gitStats.weeks?.map((week, weekIndex: number) => (
									<div
										key={weekIndex}
										className="flex flex-col"
									>
										<div
											key={weekIndex}
											className={`flex flex-col gap-2 h-full bg-accent ${
												week.contributionDays &&
												week.contributionDays[0].weekday === 0
													? "justify-start"
													: "justify-end"
											}`}
										>
											{week.contributionDays &&
												week.contributionDays.map((day, dayIndex: number) => (
													<div
														key={dayIndex}
														className={cn(
															"w-[10] h-[10]",
															getContributionLevel(day.contributionLevel)
														)}
													></div>
												))}
										</div>
									</div>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
				)}
				<pre>{JSON.stringify(gitStats, null, 4)}</pre>
			</div>
		</section>
	);
};

export default GitStats;
