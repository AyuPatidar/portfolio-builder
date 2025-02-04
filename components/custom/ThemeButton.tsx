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
			className="bg-secondary transition-all duration-300 rounded-full gap-2 px-2 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
		>
			{theme === "light" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, delay: 0.15 }}
				>
					<Sun />
				</motion.div>
			)}
			{theme === "dark" && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, delay: 0.15 }}
				>
					<Moon />
				</motion.div>
			)}
		</Button>
	);
};

export default ThemeButton;
