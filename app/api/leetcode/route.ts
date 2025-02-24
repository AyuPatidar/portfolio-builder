import { NextRequest, NextResponse } from "next/server";

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
	months?: MonthEntity[] | null;
}

const processSubmissionCalendar = (submissionCalendar: {
	[key: string]: number;
}): ISubmissionCalendar => {
	const filledCalendar: { [key: string]: number } = {};
	const today = new Date();
	const oneYearAgo = new Date();
	oneYearAgo.setDate(today.getDate() - 365);

	let totalSubmissions = 0;
	let maxSubmissionsInOneDay = 0;

	for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
		const dateString = d.toISOString().split("T")[0];
		const submissionCount = Object.keys(submissionCalendar).some(timestamp => {
			const formattedDate = new Date(Number(timestamp) * 1000)
				.toISOString()
				.split("T")[0];
			return formattedDate === dateString;
		})
			? submissionCalendar[Date.parse(dateString) / 1000] || 0
			: 0;
		filledCalendar[dateString] = submissionCount;
		totalSubmissions += submissionCount;
		maxSubmissionsInOneDay = Math.max(maxSubmissionsInOneDay, submissionCount);
	}

	const months: MonthEntity[] = [];
	let currentMonth: MonthEntity | null = null;
	let currentWeeks: Week[] = [];
	let currentWeek: Week | null = null;
	let currentWeekDays: SubmissionDaysEntity[] = [];

	for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
		const dateString = d.toISOString().split("T")[0];
		const submissionCount = filledCalendar[dateString];
		const weekday = d.getDay();
		const month = d.toLocaleString("default", { month: "long" });

		if (!currentMonth || currentMonth.month !== month) {
			if (currentMonth) {
				if (currentWeek) {
					currentWeek.submissionDays = currentWeekDays;
					currentWeeks.push(currentWeek);
				}
				currentMonth.weeks = currentWeeks;
				months.push(currentMonth);
			}
			currentMonth = { month, weeks: [] };
			currentWeeks = [];
			currentWeek = null;
			currentWeekDays = [];
		}

		if (!currentWeek || weekday === 0) {
			if (currentWeek) {
				currentWeek.submissionDays = currentWeekDays;
				currentWeeks.push(currentWeek);
			}

			let weekStart = new Date(d);
			weekStart.setDate(d.getDate() - weekday); // Move back to Sunday

			currentWeek = {
				weekStartDate: weekStart.toISOString().split("T")[0],
				submissionDays: [],
			};
			currentWeekDays = [];
		}

		currentWeekDays.push({ submissionCount, weekday, date: dateString });
	}

	if (currentWeek) {
		currentWeek.submissionDays = currentWeekDays;
		currentWeeks.push(currentWeek);
	}
	if (currentMonth) {
		currentMonth.weeks = currentWeeks;
		months.push(currentMonth);
	}

	return { totalSubmissions, maxSubmissionsInOneDay, months };
};

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const username = searchParams.get("username");

	if (!username)
		return NextResponse.json(
			{ error: "Query param username is required" },
			{ status: 400 }
		);

	try {
		// rapid api starts here
		// const url = `https://leetcode-api.p.rapidapi.com/user/${username}/active-years?year=2024`;
		// const options = {
		// 	method: "GET",
		// 	headers: {
		// 		"x-rapidapi-key": "Sign Up for Key",
		// 		"x-rapidapi-host": "leetcode-api.p.rapidapi.com",
		// 	},
		// };

		// const response = await fetch(url, options);
		// const result = await response.text();
		// console.log(result);
		// rapid api ends here

		const submissionCalendar = {
			"1737590400": 1,
			"1737936000": 3,
			"1738022400": 6,
			"1738108800": 12,
			"1738195200": 3,
			"1738281600": 31,
			"1738713600": 4,
			"1738972800": 1,
			"1739059200": 2,
			"1739145600": 1,
			"1739232000": 3,
			"1739318400": 2,
			"1739404800": 1,
			"1739491200": 3,
			"1739577600": 1,
			"1739664000": 1,
			"1739750400": 4,
			"1739836800": 2,
			"1739923200": 1,
			"1740009600": 1,
			"1740096000": 5,
			"1740182400": 3,
			"1740268800": 3,
			"1740355200": 3,
			"1712188800": 4,
			"1733875200": 4,
			"1733961600": 3,
			"1734048000": 2,
			"1734307200": 3,
			"1734393600": 11,
			"1734480000": 6,
			"1734566400": 2,
			"1734652800": 3,
			"1735084800": 1,
			"1735430400": 1,
		};

		const submissions = processSubmissionCalendar(submissionCalendar);

		return NextResponse.json({ ...submissions }, { status: 200 });
	} catch (error) {
		console.error("Fetch Leetcode submissions Error: ", error);
		return NextResponse.json(
			{ error: "Failed to fetch the leetcode submissions" },
			{ status: 500 }
		);
	}
}
