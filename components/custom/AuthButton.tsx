"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthButton: React.FC = () => {
	const { data: session } = useSession();
	const [loading, setLoading] = useState<boolean>(false);
	let timeoutId: NodeJS.Timeout | undefined;

	const handleSignIn = async () => {
		setLoading(true);
		await signIn("google");
		timeoutId = setTimeout(() => {
			setLoading(false);
		}, 5000);
	};

	const handleSignOut = async () => {
		setLoading(true);
		await signOut();
		timeoutId = setTimeout(() => {
			setLoading(false);
		}, 5000);
	};

	useEffect(() => {
		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return session ? (
		<div className="flex justify-center space-x-2">
			<Button
				onClick={handleSignOut}
				disabled={loading}
				className="w-full text-lg [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
			>
				{loading ? "Signing out..." : "Sign out"}
				{!loading && <LogOut />}
			</Button>
			<Button
				disabled={loading}
				className="w-full text-lg"
			>
				<Link href={`/${session.user?.email?.split("@")[0]}`}>
					To Portfolio
				</Link>
			</Button>
		</div>
	) : (
		<Button
			onClick={handleSignIn}
			disabled={loading}
			className="w-full text-lg [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
		>
			{loading ? "Signing in..." : "Sign in with Google"}
			{!loading && <LogIn />}
		</Button>
	);
};

export default AuthButton;
