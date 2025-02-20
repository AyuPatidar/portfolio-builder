import { GitCommit } from "lucide-react";
import React from "react";

const Github = () => {
	return (
		<section
			id="activity"
			className="container mx-auto px-4 py-8 md:py-20"
		>
			<h2 className="text-3xl font-bold mb-12 text-center">
				<span className="text-primary">Github</span> Activity
			</h2>
      <div>
        <GitCommit/>
      </div>
		</section>
	);
};

export default Github;
