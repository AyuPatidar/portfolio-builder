import Navbar from "@/components/custom/Navbar";
import ThemeButton from "@/components/custom/ThemeButton";
import React from "react";

const layout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div>
			<div className="flex sm:hidden fixed bottom-0 right-0 p-4">
				<ThemeButton />
			</div>
			<Navbar />
			{children}
		</div>
	);
};

export default layout;
