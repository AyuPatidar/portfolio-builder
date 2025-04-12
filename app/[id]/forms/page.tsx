"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/custom/Navbar";
import Form from "@/components/custom/Form";

const page = () => {
	const params = useParams();
	const router = useRouter();
	const { data: session, status } = useSession();

	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		if (params?.id) setId(params.id as string);
	}, [params]);

	useEffect(() => {
		if (status === "unauthenticated") router.push(`/${id}`);
		else if (
			status === "authenticated" &&
			id &&
			!session?.user?.email?.startsWith(id)
		)
			router.push(`/${id}`);
	}, [id, session, status, router]);

	if (status === "loading")
		return (
			<section className="container mx-auto px-4 pt-16 pb-20">
				Loading...
			</section>
		);

	return (
		<>
			{id && session?.user?.email?.startsWith(id) && (
				<div>
					<Navbar />
					<Form />
				</div>
			)}
		</>
	);
};

export default page;
