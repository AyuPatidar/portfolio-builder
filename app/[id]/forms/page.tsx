"use client";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/custom/sidebar/app-sidebar";

const page = ({ children }: { children: React.ReactNode }) => {
	const params = useParams();
	const router = useRouter();
	const { data: session, status } = useSession();

	const [id, setId] = useState<string | null>(null);

	useEffect(() => {
		if (params?.id) {
			setId(params.id as string);
		}
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
				<SidebarProvider>
					<AppSidebar />
					<main>
						<section className="container mx-auto px-4 pt-16 pb-20">
							<SidebarTrigger />
							{children}
						</section>
					</main>
				</SidebarProvider>
			)}
		</>
	);
};

export default page;
