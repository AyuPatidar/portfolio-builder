import React from "react";
import { TbBrandLeetcode } from "react-icons/tb";
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<section
			id="contact"
			className="px-2 py-4 md:py-8 bg-foreground"
		>
			<div className="md:mx-8 flex flex-col md:flex-row-reverse items-center gap-2 justify-between">
				<h5 className="text-2xl text-white dark:text-black opacity-100 font-bold">
					Designed by Ayush Patidar
				</h5>
				<div className="flex gap-8">
					<FaEnvelope
						className="text-background"
						size={28}
					/>
					<FaLinkedin
						className="text-background"
						size={28}
					/>
					<FaGithub
						className="text-background"
						size={28}
					/>
					<TbBrandLeetcode
						className="text-background"
						size={28}
					/>
				</div>
			</div>
		</section>
	);
};

export default Footer;
