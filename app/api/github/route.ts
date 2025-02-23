import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

interface IGitStats {
	user: {
		contributionsCollection: {
			contributionCalendar: {
				months?: MonthsEntity[] | null;
				totalContributions: number;
				weeks?: WeeksEntity[] | null;
			};
		};
	};
}
interface MonthsEntity {
	totalWeeks: number;
	name: string;
}
interface WeeksEntity {
	contributionDays?: ContributionDaysEntity[] | null;
}
interface ContributionDaysEntity {
	month?: string;
	color: string;
	contributionCount: number;
	weekday: number;
	date: string;
}

interface MonthEntity {
	month: string;
	contributionDays: ContributionDaysEntity[];
}

function convertWeeksToMonthWiseData(weeks: WeeksEntity[]): MonthEntity[] {
	const monthWiseData: { [key: string]: ContributionDaysEntity[] } = {};

	weeks.forEach(week => {
		week.contributionDays &&
			week.contributionDays.forEach(day => {
				const date = new Date(day.date);
				const month = date.toLocaleString("default", { month: "short" }); // Get "YYYY-MM" from the date string

				if (!monthWiseData[month]) {
					monthWiseData[month] = [];
				}

				monthWiseData[month].push(day);
			});
	});

	// Convert the monthWiseData object to an array of MonthData objects
	const monthArray: MonthEntity[] = Object.keys(monthWiseData).map(month => ({
		month,
		contributionDays: monthWiseData[month],
	}));

	return monthArray;
}

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const username = searchParams.get("username");

	if (!username)
		return NextResponse.json(
			{ error: "Query param username is required." },
			{ status: 400 }
		);
	try {
		const query = `query ($username: String!) {
			user(login: $username) {
				contributionsCollection {
					contributionCalendar {
						totalContributions
						weeks {
							contributionDays {
								contributionLevel
								contributionCount
								weekday
								date
							}
						}
					}
				}
			}
		}`;

		const response: IGitStats = await octokit.graphql(query, { username });

		const { totalContributions, weeks } =
			response.user.contributionsCollection.contributionCalendar;

		const monthWiseData: MonthEntity[] = weeks
			? convertWeeksToMonthWiseData(weeks)
			: [];

		return NextResponse.json({
			totalContributions: totalContributions,
			months: monthWiseData,
		});
	} catch (error) {
		console.error("Fetch Github contributions Error: ", error);
		return NextResponse.json(
			{ error: "Failed to fetch the github contributions" },
			{ status: 500 }
		);
	}
}
