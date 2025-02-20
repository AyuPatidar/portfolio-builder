import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

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
                              color
                              contributionCount
                              weekday
                              date
                            }
                          }
                        }
                      }
                    }
                  }`;
		const response = await octokit.graphql(query, { username });
		return NextResponse.json({ response });
	} catch (error) {
		console.error("Fetch Github contributions Error: ", error);
		return NextResponse.json(
			{ error: "Failed to fetch the github contributions" },
			{ status: 500 }
		);
	}
}
