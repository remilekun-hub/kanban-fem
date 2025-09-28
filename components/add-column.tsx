"use client";
import React, { useEffect, useState, useTransition } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { addColumnSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Form,
	FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import { Loader2, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { addUserColumn } from "@/app/(dashboard)/board/actions";
import { toast } from "sonner";
import { createColumn } from "@/lib/features/boardSlice";
import { v4 as uuidv4 } from "uuid";

export default function AddColumn({
	boardId,
	userId,
}: {
	boardId: string;
	userId: string;
}) {
	const dispatch = useDispatch();
	const [isPending, startTransition] = useTransition();
	const [open, setOpen] = useState(false);
	const board = useSelector((state: RootState) => state.board);
	const form = useForm<z.infer<typeof addColumnSchema>>({
		resolver: zodResolver(addColumnSchema),
		defaultValues: {
			boardName: "",
			columnNames: [{ name: "" }],
			id: "",
		},
		mode: "onBlur",
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "columnNames",
	});

	const onSubmit = (data: z.infer<typeof addColumnSchema>) => {
		alert("submitted");
		console.log("submitted");
		console.log({ data });
		const columns = data.columnNames.map((d) => ({
			name: d.name,
			id: uuidv4(),
		}));

		startTransition(async () => {
			const result = await addUserColumn(
				userId,
				boardId,
				columns,
				data.boardName
			);

			if (!result.success) {
				toast.error("Error", { description: result.error });
			} else {
				toast.success("Success", { description: result.message });
				dispatch(createColumn({ ...data, columns: columns }));
			}
		});
	};

	useEffect(() => {
		if (board) {
			form.reset({
				boardName: board.boardName,
				columnNames: [...board.columns],
				id: board.id,
			});
		}
	}, [form, board]);

	return (
		<div>
			<div className="flex flex-col justify-center h-full mt-[31px] max-h-[calc(100svh-150px)] lg:max-h-[calc(100svh-170px)]">
				<div className="cursor-pointer flex h-full justify-center items-center bg-foreground dark:bg-[#22232E] rounded-[6px] shrink-0 min-w-[280px]">
					<button
						className="text-muted font-[700] text-[24px] leading-[30px] hover:text-primary"
						onClick={() => setOpen(true)}
					>
						+ New Column
					</button>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent
					className="bg-white dark:bg-[#2B2C37]"
					// showCloseButton={false}
				>
					<DialogHeader>
						<DialogTitle className="text-black dark:text-white font-[700]">
							Edit board
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
															placeholder="Column name"
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
										append(
											{ name: "" },
											{ shouldFocus: false }
										)
									}
								>
									+ Add New Column
								</Button>
								<Button
									className="font-[700] h-[42px] text-[13px] cursor-pointer"
									type="submit"
								>
									{isPending ? (
										<Loader2 className="animate-spin size-4" />
									) : null}{" "}
									Save Changes
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
