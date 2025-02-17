"use client";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
	const { id } = useParams();
	return (
		<div>
			<Hero />
			<Skills />
			<Experience />
			<Projects />
			<Education />
		</div>
	);
};

export default page;
