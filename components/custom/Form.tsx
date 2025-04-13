import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

// define form schema
const FormSchema = z.object({
	welcomeText: z
		.string()
		.min(1, { message: "Welcome Text is required." })
		.max(40, { message: "Welcome text can be at max 40 char long." }),
	description: z.string().min(1, { message: "Description is required." }),
	skills: z
		.array(z.string().min(1, { message: "Skill is required." }))
		.min(1, { message: "Atleast 1 skill is required." }),
});

const MyForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			welcomeText: "",
			description: "",
			skills: [""],
		},
	});

	// handles the skills array of form
	const {
		fields: skills,
		append: appendSkill,
		remove: removeSkill,
	} = useFieldArray({
		// @ts-ignore
		name: "skills",
		control: form.control,
	});

	// handles form submission
	const onSubmit = (data: z.infer<typeof FormSchema>) => {
		console.log("triggered");
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			className: "bg-primary text-white",
		});
	};

	return (
		<div className="w-full mx-auto flex justify-center container mt-32">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6"
				>
					<FormField
						control={form.control}
						name={"welcomeText"}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Welcome Text</FormLabel>
								<FormControl>
									<Input
										placeholder="Welcome Text"
										className="border-2 border-primary dark:border-primary"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={"description"}
						render={({ field }) => (
							<FormItem>
								<div className="flex justify-between">
									<FormLabel>Description</FormLabel>
									<FormDescription>You can provide it as HTML</FormDescription>
								</div>
								<FormControl>
									<Textarea
										placeholder="Description"
										className="border-2 border-primary dark:border-primary"
										rows={4}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="skills"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Skills</FormLabel>
								<div className="space-y-4">
									{skills.map((skill, index) => (
										<div
											key={skill.id}
											className="flex items-center space-x-4"
										>
											<FormControl>
												<Input
													placeholder="Skill"
													className="border-2 border-primary"
													{...form.register(`skills.${index}`)}
												/>
											</FormControl>
											<Button
												type="button"
												variant={"destructive"}
												onClick={() => removeSkill(index)}
											>
												Remove
											</Button>
										</div>
									))}
								</div>
								<Button
									type="button"
									variant={"outline"}
									onClick={() => appendSkill("")}
									className="border-accent-foreground"
								>
									Add Skill
								</Button>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default MyForm;
