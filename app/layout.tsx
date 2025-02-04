import type { Metadata } from "next";
import { Tangerine, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
});

const tangerine = Tangerine({
	weight: ["400", "700"],
	subsets: ["latin"],
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
			<body className={`${inter.className} ${tangerine.className}`}>
				{children}
			</body>
		</html>
	);
}
