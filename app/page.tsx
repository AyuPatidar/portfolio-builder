"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { Tangerine } from "next/font/google";
import { useTheme } from "../hooks/custom-hooks/use-theme";

export const tangerine = Tangerine({
	weight: ["700"],
	subsets: ["latin"],
});

export default function Home() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="flex w-full">
			<Button
				onClick={toggleTheme}
				className="p-2"
			>
				{theme === "light" ? <Sun /> : <Moon />} Toggle Theme
			</Button>
		</div>
	);
}
