import React from "react";
import { experience } from "@/constants";

const Experience = () => {
	return (
		<section
			id="experience"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				Industry <span className="text-primary">Experience</span>
			</h2>
			{experience.map((exp, index) => (
				<div key={index}>
					<br />
					Company: {exp.company}
					<br />
					Job Designation: {exp.jobDesignation}
					<br />
					Location: {exp.location}
					<br />
					Period: {exp.period}
					<br />
					Skills put to test: {exp.skills}
					<br />
					Responsibilities:
					<br />
					{exp.responsibilities.map((resp, index) => (
						<div key={index}>◦ {resp}</div>
					))}
					<br />
				</div>
			))}
		</section>
	);
};

export default Experience;
