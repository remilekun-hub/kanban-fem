"use client";
import { addColumnSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import BoardIcon from "@/app/icons/board-icon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { XIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createBoard } from "../lib/features/boardSlice";
import { RootState } from "@/lib/features/store";

export default function Createboard() {
	const boardState = useSelector((state: RootState) => state.board);
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof addColumnSchema>>({
		resolver: zodResolver(addColumnSchema),
		defaultValues: {
			boardName: "",
			columnNames: [],
		},
		mode: "all",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "columnNames",
	});

	const onSubmit = (data: z.infer<typeof addColumnSchema>) => {
		alert("submitted");

		const columnNames = data.columnNames.map((col) => {
			return { name: col.name, id: "k" };
		});
		dispatch(
			createBoard({
				id: "1",
				boardName: data.boardName,
				columns: columnNames,
			})
		);
	};
	return (
		<div>
			<Button
				variant={"default"}
				className="!pl-6 mr-6 justofy-start !py-6 font-[700] text-[15px] leading-[19px] rounded-l-none hover:cursor-pointer !text-primary !bg-transparent justify-start"
				onClick={() => setOpen(true)}
			>
				<BoardIcon className="mr-2" />+ Create New Board
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="bg-white dark:bg-[#2B2C37]">
					<DialogHeader>
						<DialogTitle className="text-black dark:text-white font-[700]">
							Add New Board
						</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name={"boardName"}
								render={({ field }) => (
									<FormItem className="mb-7">
										<FormLabel className="font-[700] text-[12px] text-muted dark:text-white">
											Board Name
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g Web design"
												className="text-[rgba(130, 143, 163, .25)] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] text-[13px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
							<h3 className="font-[700] text-[12px] text-muted dark:text-white">
								Board Columns
							</h3>
							<div className="!mt-3 flex flex-col gap-4">
								{fields.map((field, index) => (
									<FormField
										key={field.id}
										control={form.control}
										name={`columnNames.${index}.name`}
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
									onClick={() => append({ name: "" })}
								>
									+ Add New Column
								</Button>
								<Button
									className="font-[700] h-[42px] text-[13px] cursor-pointer"
									type="submit"
								>
									Create New Board
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
