"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
	children?: ReactNode;
	session?: any;
}

const Provider = ({ children, session }: Props) => {
	console.log(session, "ye dekho", children);
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
