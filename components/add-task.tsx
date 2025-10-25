import React, { useTransition, useState, useEffect } from "react";
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
import { toast } from "sonner";
import { RootState } from "@/lib/features/store";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { addTask } from "@/lib/features/boardSlice";
import { createTask } from "@/app/(dashboard)/board/actions";
import { SubTaskType } from "@/app/types";
import { v4 as uuidv4 } from "uuid";

export default function AddTask() {
	const dispatch = useDispatch();
	const board = useSelector((state: RootState) => state.board);
	const [isPending, startTransition] = useTransition();
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
			],
			columnId: "",
		},
		mode: "onChange",
	});
	const { data: session } = useSession();
	const userId = session?.user?.id;

	const boardId = board.id;
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "subtasks",
	});

	const onSubmit = (data: z.infer<typeof addTaskSchema>) => {
		if (!userId) {
			return toast.error("Error", {
				description: "Please sign in to continue",
			});
		}
		const taskName = data.name;
		const desc = data.description;
		const subTasks = data.subtasks;
		const colId = data.columnId;
		startTransition(async () => {
			const result = await createTask(
				taskName,
				desc,
				colId,
				boardId,
				userId,
				subTasks
			);
			if (!result.success) {
				toast.error("Error", { description: result.message });
			} else {
				dispatch(
					addTask({
						columnId: colId,
						task: {
							id: result.data?.columnId as string,
							taskName: result.data?.task.taskName as string,
							description: result.data?.task
								.description as string,
							subtasks: result.data?.task
								.subtasks as SubTaskType[],
						},
					})
				);
				toast.success("Success", { description: result.message });
				form.reset();
				setOpen(false);
			}
		});
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
									disabled={isPending}
									onClick={() =>
										append(
											{
												completed: false,
												title: "",
											},
											{ shouldFocus: false }
										)
									}
								>
									+ Add New SubTask
								</Button>

								<div>
									<FormField
										control={form.control}
										name={"columnId"}
										render={({ field }) => (
											<FormItem className="mb-7">
												<FormLabel className="font-[700] text-[12px] text-muted dark:text-white">
													Current Status
												</FormLabel>
												<FormControl>
													<select
														id=""
														className="mt-4 px-2 !text-[13px] w-full text-[rgba(130, 143, 163, .25)] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] text-[13px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
														{...field}
													>
														{board.columns.map(
															(c) => (
																<option
																	key={c.id}
																	value={c.id}
																>
																	{c.name}
																</option>
															)
														)}
													</select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button
									className="font-[700] h-[42px] text-[13px] cursor-pointer"
									type="submit"
									isLoading={isPending}
									disabled={isPending}
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
