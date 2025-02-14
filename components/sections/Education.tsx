import { education } from "@/constants";
import React from "react";

const Education = () => {
	return (
		<section
			id="education"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				<span className="text-primary">Education</span>
			</h2>
			<div>
				{education.map((ed, index) => (
					<div key={index}>
						<br />
						Institute: {ed.institute}
						{ed.degree && <br />}
						{ed.degree && "Degree: " + ed.degree}
						<br />
						CGPA: {ed.cgpa}
						<br />
						Period: {ed.period}
						<br />
						{ed.coursework && "Coursework: "}
						{ed.coursework && (
							<>
								{ed.coursework.map((cw, index) => (
									<div
										key={index}
										className="inline"
									>
										{index != 0 && ", "}
										{cw}
									</div>
								))}
								<br />
							</>
						)}
						{ed.grade && "Grade: " + ed.grade}
						<br />
					</div>
				))}
			</div>
		</section>
	);
};

export default Education;
