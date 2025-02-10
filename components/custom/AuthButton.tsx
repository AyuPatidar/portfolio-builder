"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

const AuthButton: React.FC = () => {
	const { data: session } = useSession();

	const handleSignIn = () => signIn("google");

	const handleSignOut = () => signOut();

	return session ? (
		<div className="flex justify-center space-x-2">
			<Button
				onClick={handleSignOut}
				className="w-full text-lg [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
			>
				Sign out <LogOut />
			</Button>
			<Button className="w-full text-lg">
				<Link href={`/${session.user?.email?.split("@")[0]}`}>
					To Portfolio
				</Link>
			</Button>
		</div>
	) : (
		<Button
			onClick={handleSignIn}
			className="w-full text-lg [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
		>
			Sign in with Google <LogIn />
		</Button>
	);
};

export default AuthButton;
