"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton: React.FC = () => {
	const { data: session } = useSession();

	return (
		<div>
			{session ? (
				<div>
					<p>Welcome, {session.user?.name}!</p>
					<button onClick={() => signOut()}>Sign out</button>
				</div>
			) : (
				<button onClick={() => signIn("google")}>Sign in with Google</button>
			)}
		</div>
	);
};

export default AuthButton;
