import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

export const ubuntu = Ubuntu({
	subsets: ["cyrillic"],
	weight: ["300"],
});

export const metadata: Metadata = {
	title: "Create Your Stunning Portfolio in Minutes – Simple Form-Based Design",
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
			<body className={`${ubuntu.className}`}>{children}</body>
		</html>
	);
}
