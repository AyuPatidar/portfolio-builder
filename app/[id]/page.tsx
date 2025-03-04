"use client";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GitStats from "../../components/sections/GitStats";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const page = () => {
	const params = useParams();
	const router = useRouter();
	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		if (params?.id) {
			setId(params.id as string);
		}
	}, [params]);

	return (
		<div>
			<div>
				<Hero />
				<Skills />
				<Experience />
				<Projects />
				<Education />
				{/* <GitStats /> */}
				<Footer />
			</div>
			<div className="fixed bottom-10 right-10">
				<Button
					type="button"
					onClick={() => router.push(`/${id}/forms`)}
					variant={"ghost"}
					className="flex items-center justify-center bg-secondary rounded-full shadow-lg w-16 h-16 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
				>
					<FaUserEdit />
				</Button>
			</div>
		</div>
	);
};

export default page;
