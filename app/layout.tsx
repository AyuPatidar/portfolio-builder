import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/custom/SessionProvider";

export const ubuntu = Ubuntu({
	subsets: ["cyrillic"],
	weight: ["300"],
});

export const metadata: Metadata = {
	title: "Portfolio",
	description:
		"Showcase your portfolio effortlessly with our intuitive platform. Complete a few easy forms and let the app automatically handle the professional design tailored to your work.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${ubuntu.className}`}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
