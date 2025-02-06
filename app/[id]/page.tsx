"use client";
import Hero from "@/components/sections/Hero";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
	const { id } = useParams();
	return (
		<div>
			<Hero />
		</div>
	);
};

export default page;
