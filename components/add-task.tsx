import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useFieldArray, useForm } from "react-hook-form";
import { addTaskSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Form,
	FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";

export default function AddTask() {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof addTaskSchema>>({
		resolver: zodResolver(addTaskSchema),
		defaultValues: {
			name: "",
			description: "",
			subtasks: [
				{
					completed: false,
					title: "",
				},
				{
					completed: false,
					title: "",
				},
			],
		},
		mode: "all",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "subtasks",
	});

	const onSubmit = (data: z.infer<typeof addTaskSchema>) => {
		alert("submitted");
		console.log({ data });
	};
	return (
		<div>
			<Button
				variant={"default"}
				className="flex md:hidden !px-4 mr-4 font-[700] text-[15px] leading-[19px] rounded-[24px] h-[30px] justify-center items-center cursor-pointer"
				onClick={() => setOpen(true)}
			>
				<PlusIcon strokeWidth={4} />
			</Button>

			<Button
				variant={"default"}
				className="cursor-pointer hidden md:flex !px-6 !py-6 mr-4 font-[700] text-[15px] leading-[19px]"
				onClick={() => setOpen(true)}
			>
				+ Add New Task
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					className="bg-white dark:bg-[#2B2C37]"
					// showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle className="text-black dark:text-white font-[700]">
							Add New Task
						</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name={"name"}
								render={({ field }) => (
									<FormItem className="mb-7">
										<FormLabel className="font-[700] text-[12px] text-muted dark:text-white">
											Task Name
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g Take coffee break"
												className="text-[rgba(130, 143, 163, .25)] !text-[13px] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
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
									<FormItem className="mb-7">
										<FormLabel className="font-[700] text-[12px] text-muted dark:text-white">
											Description
										</FormLabel>
										<FormControl>
											<Textarea
												className="resize-none text-[rgba(130, 143, 163, .25)] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 rounded-[4px] !text-[13px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary h-[100px]"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<h3 className="font-[700] text-[12px] text-muted dark:text-white">
								Subtasks
							</h3>
							<div className="!mt-3 flex flex-col gap-4">
								{fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`subtasks.${index}.title`}
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="flex items-center gap-3">
														<Input
															// placeholder="Column name"
															className="text-[rgba(130, 143, 163, .25)] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] text-[13px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
															{...field}
														/>

														<button
															className="outline-none ring-0 cursor-pointer"
															type="button"
															onClick={() =>
																remove(index)
															}
														>
															<XIcon
																className="text-muted size-6"
																strokeWidth={3}
															/>
														</button>
													</div>
												</FormControl>

												<FormMessage />
											</FormItem>
										)}
									/>
								))}
							</div>
							<div className="flex flex-col gap-4 mt-5">
								<Button
									className="font-[700] h-[42px] text-[13px] dark:bg-white dark:text-primary cursor-pointer mb-2"
									type="button"
									onClick={() =>
										append({ completed: false, title: "" })
									}
								>
									+ Add New SubTask
								</Button>

								<div>
									<FormLabel className="font-[700] text-[12px] text-muted dark:text-white">
										Current Status
									</FormLabel>
									<select
										name=""
										id=""
										className="mt-4 px-2 !text-[13px] w-full text-[rgba(130, 143, 163, .25)] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] text-[13px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
									>
										<option value="one">one</option>
										<option value="two">two</option>
									</select>
								</div>
								<Button
									className="font-[700] h-[42px] text-[13px] cursor-pointer"
									type="submit"
								>
									Create Task
								</Button>
							</div>
						</form>
					</Form>

					{/* <AddColForm /> */}
				</DialogContent>
			</Dialog>
		</div>
	);
}
