import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const FormSchema = z.object({
	welcomeText: z
		.string()
		.min(1, { message: "Welcome Text is required." })
		.max(40, { message: "Welcome text can be at max 40 char long." }),
	description: z.string().min(1, { message: "Description is required." }),
});

const MyForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			welcomeText: "",
			description: "",
		},
	});

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
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Description"
										className="border-2 border-primary dark:border-primary"
										rows={4}
										{...field}
									/>
								</FormControl>
								<FormDescription>You can provide it as HTML</FormDescription>
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
