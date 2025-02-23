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
	color: string;
	contributionCount: number;
	weekday: number;
	date: string;
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

		return NextResponse.json({
			totalContributions: totalContributions,
			weeks: weeks,
		});
	} catch (error) {
		console.error("Fetch Github contributions Error: ", error);
		return NextResponse.json(
			{ error: "Failed to fetch the github contributions" },
			{ status: 500 }
		);
	}
}
