"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/custom-hooks/use-theme";
import React from "react";
import { motion } from "framer-motion";

const ThemeButton = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<Button
			type="button"
			onClick={toggleTheme}
			variant={"ghost"}
			size={"lg"}
			className="bg-secondary rounded-full gap-2 px-2 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
		>
			{theme === "light" ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ThemeButton;
