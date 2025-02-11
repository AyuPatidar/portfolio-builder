"use client";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
	const { id } = useParams();
	return (
		<div>
			<Hero />
			<Skills />
		</div>
	);
};

export default page;
