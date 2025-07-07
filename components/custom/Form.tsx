import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
import * as icons from "simple-icons";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";

// define form schema
const FormSchema = z.object({
	welcomeText: z
		.string()
		.min(1, { message: "Welcome Text is required." })
		.max(40, { message: "Welcome text can be at max 40 char long." }),
	description: z.string().min(1, { message: "Description is required." }),
	skills: z
		.array(z.string().min(1, { message: "Skill must be non-empty." }))
		.min(1, { message: "At least 1 skill is required." })
		.refine(skills => skills.every(skill => skill.trim().length > 0), {
			message: "All skills must be non-empty.",
		}),
});

const MyForm = () => {
	const [iconNames, setIconNames] = useState<string[]>([]);
	const [popoverOpenStates, setPopoverOpenStates] = useState<boolean[]>([]);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			welcomeText: "",
			description: "",
			skills: [""],
		},
	});

	const { control, handleSubmit, register, watch } = form;
	const watchedSkills = watch("skills");

	useEffect(() => {
		const names: string[] = [];
		for (const icon in icons) {
			names.push((icons as any)[icon].slug);
		}
		setIconNames(names);
		setPopoverOpenStates(
			new Array(form.getValues("skills").length).fill(false)
		);
	}, []);

	useEffect(() => {
		setPopoverOpenStates(new Array(watchedSkills.length).fill(false));
	}, [watchedSkills.length]);

	const findIconSvg = (skill: string) => {
		if (!skill) return null;
		const searchKey = `si${skill.trim().toLowerCase()}`;
		for (const icon in icons) {
			if (icon.toLowerCase() === searchKey) return (icons as any)[icon].svg;
		}
		return null;
	};

	// handles the skills array of form
	const {
		fields: skills,
		append: appendSkill,
		remove: removeSkill,
	} = useFieldArray({
		// @ts-ignore
		name: "skills",
		control: control,
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
					onSubmit={handleSubmit(onSubmit)}
					className="w-2/3 space-y-6"
				>
					{/* Welcome text */}
					<FormField
						control={control}
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

					{/* Description Text */}
					<FormField
						control={control}
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

					{/* Skills */}
					<FormField
						control={control}
						name="skills"
						render={({}) => (
							<FormItem>
								<div className="flex justify-between">
									<FormLabel>Skills & Technologies</FormLabel>
									<FormDescription>
										Try different variations for input if icon doesn't appear
									</FormDescription>
								</div>
								<div className="space-y-4">
									{skills.map((skill, index) => {
										const currentSkill = watchedSkills?.[index] || "";
										const iconSvg = findIconSvg(currentSkill);
										return (
											<div
												key={skill.id}
												className="flex items-center gap-4"
											>
												<FormControl>
													<Controller
														control={control}
														name={`skills.${index}`}
														render={({ field }) => (
															<Popover
																open={popoverOpenStates[index]}
																onOpenChange={isOpen => {
																	const newOpenStates = [...popoverOpenStates];
																	newOpenStates[index] = isOpen;
																	setPopoverOpenStates(newOpenStates);
																}}
															>
																<PopoverTrigger
																	asChild
																	className="w-full"
																>
																	<Button
																		variant="outline"
																		role="combobox"
																		className="justify-between"
																	>
																		{field.value
																			? field.value
																			: "Select skill..."}
																		<ChevronsUpDown className="opacity-50" />
																	</Button>
																</PopoverTrigger>
																<PopoverContent className="w- p-0">
																	{/* @ts-ignore */}
																	<Command>
																		<CommandInput
																			// @ts-ignore
																			placeholder="Search skill..."
																			className="h-9"
																		/>
																		{/* @ts-ignore */}
																		<CommandList>
																			{/* @ts-ignore */}
																			<CommandEmpty>
																				No skill found.
																			</CommandEmpty>
																			{/* @ts-ignore */}
																			<CommandGroup>
																				{iconNames.map(iconName => (
																					// @ts-ignore
																					<CommandItem
																						key={iconName}
																						value={iconName}
																						onSelect={(
																							currentValue: string
																						) => {
																							field.onChange(currentValue);
																							const newOpenStates = [
																								...popoverOpenStates,
																							];
																							newOpenStates[index] = false;
																							setPopoverOpenStates(
																								newOpenStates
																							);
																						}}
																					>
																						{iconName}
																						<Check
																							className={cn(
																								"ml-auto",
																								field.value === iconName
																									? "opacity-100"
																									: "opacity-0"
																							)}
																						/>
																					</CommandItem>
																				))}
																			</CommandGroup>
																		</CommandList>
																	</Command>
																</PopoverContent>
															</Popover>
														)}
													/>
												</FormControl>
												{iconSvg && (
													<div
														className="w-12 fill-primary flex items-center justify-center"
														dangerouslySetInnerHTML={{
															__html: iconSvg,
														}}
													></div>
												)}
												<Button
													type="button"
													variant={"destructive"}
													onClick={() => removeSkill(index)}
												>
													Remove
												</Button>
											</div>
										);
									})}
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
