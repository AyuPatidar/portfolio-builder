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
import { FaPencil } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Navbar from "@/components/custom/Navbar";

const page = () => {
	const params = useParams();
	const router = useRouter();
	const { data: session } = useSession();

	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		if (params?.id) {
			setId(params.id as string);
		}
	}, [params]);

	return (
		<div>
			<Navbar />
			<Hero />
			<Skills />
			<Experience />
			<Projects />
			<Education />
			{/* <GitStats /> */}
			<Footer />
			{id && session?.user?.email?.startsWith(id) && (
				<div className="fixed bottom-4 right-4 md:bottom-10 md:right-10">
					<Button
						type="button"
						onClick={() => router.push(`/${id}/forms`)}
						variant={"ghost"}
						className="flex items-center justify-center bg-secondary-foreground hover:bg-opacity-100 rounded-full shadow-lg w-12 h-12 md:w-16 md:h-16 [&_svg]:pointer-events-none [&_svg]:size-6 md:[&_svg]:size-8 [&_svg]:shrink-0"
					>
						<FaPencil className="text-white dark:text-black" />
					</Button>
				</div>
			)}
		</div>
	);
};

export default page;
