import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/custom/SessionProvider";

export const inter = Inter({
	subsets: ["latin"],
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
			<body className={`${inter.className}`}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	);
}
