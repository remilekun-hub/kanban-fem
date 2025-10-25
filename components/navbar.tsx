"use client";
import Image from "next/image";
import React, {useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { MoreVertical, XIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { addColumnSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { RootState } from "@/lib/features/store";
import { useDispatch, useSelector } from "react-redux";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Form,
	FormLabel,
} from "./ui/form";
import { Input } from "./ui/input";
import AddTask from "./add-task";
import { deleteBoard } from "@/app/(dashboard)/board/actions";
import { toast } from "sonner";
import { removeBoard } from "@/lib/features/boardSlice";
import { useSession } from "next-auth/react";

export default function Navbar() {
	const { open } = useSidebar();
	const [isPending, startTransition] = useTransition();
	const [confirmDelete, setConfirmDelete] = useState(false);
	const board = useSelector((state: RootState) => state.board);
	const [editBoard, setEditBoard] = useState(false);
	const dispatch = useDispatch();
	const form = useForm<z.infer<typeof addColumnSchema>>({
		resolver: zodResolver(addColumnSchema),
		defaultValues: {
			boardName: "",
			columnNames: [{ name: "", id: "" }],
			id: "",
		},
		mode: "all",
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "columnNames",
	});

	const onSubmit = (data: z.infer<typeof addColumnSchema>) => {
		console.log({ data });
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

	const { data: session } = useSession();
	const userId = session?.user?.id;
	const boardId = form.watch("id");

	const handleDeleteBoard = () => {
		if (!userId) {
			return toast.error("Error", {
				description: "Please sign in to continue",
			});
		}
		startTransition(async () => {
			const result = await deleteBoard(userId, boardId);
			if (!result.success) {
				toast.error("Error", { description: result.message });
			} else {
				dispatch(removeBoard());
				setConfirmDelete(false);
				window.location.href = "/board";
			}
		});
	};
	return (
		<header className="w-full border-b h-[65px] md:h-[80px] bg-white dark:bg-sidebar flex !items-center !justify-between !px-4 lg:!px-5 sticky top-0">
			{!open && (
				<div className="flex flex-row !flex-start items-center gap-[15px] mr-[106px]">
					<Image
						width={25}
						height={25}
						src={"/kanban-logo.svg"}
						alt="kanban logo"
					/>
					<h1 className="text-black text-[21px] md:text-[32px] font-[700] dark:text-white">
						Kanban
					</h1>
				</div>
			)}

			<div className="justify-between flex items-center md:flex-1">
				<h1 className="hidden md:block text-black dark:text-white font-[700] text-[1.315rem]">
					{board.boardName}
				</h1>
				<div className="flex items-center">
					<AddTask />
				

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="outline-none ring-0 focus-within:ring-0">
								<MoreVertical className="text-muted size-7 hover:cursor-pointer" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-10 mr-16 mt-4 !bg-white dark:bg-background shadow-[0_10px_20px_rgba(54, 78, 126, .25)]">
							<DropdownMenuItem className="hover:!bg-none cursor-pointer py-2.5 focus:!bg-white">
								<button
									className="w-full text-start text-[13px] font-[500] text-muted cursor-pointer"
									onClick={() => setEditBoard(true)}
								>
									Edit board
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:!bg-none cursor-pointer py-2.5 focus:!bg-white">
								<button
									className="w-full text-start text-[13px] font-[500] text-[#ea5555] cursor-pointer"
									onClick={() => setConfirmDelete(true)}
								>
									Delete board
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<AlertDialog
					open={confirmDelete}
					onOpenChange={setConfirmDelete}
				>
					<AlertDialogContent className="bg-white dark:bg-background">
						<AlertDialogHeader>
							<AlertDialogTitle className="text-[#ea5555] font-[700] text-[18px] mb-4">
								Delete this board?
							</AlertDialogTitle>
							<AlertDialogDescription className="font-[500] text-[13px] leading-[23px] text-muted">
								Are you sure you want to delete the "
								{board.boardName}" board ?. This action will
								remove all columns and tasks and cannot be
								reversed.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="w-full flex flex-col gap-4 items-stretch md:flex-row sm:justify-start mt-2 mb-2">
							<Button
								variant={"destructive"}
								className="flex-1 bg-[#ea5555] cursor-pointer hover:bg-[#FF9898] font-[700] leading-[23px] h-[42px] text-[13px]"
								isLoading={isPending}
								disabled={isPending}
								onClick={handleDeleteBoard}
							>
								Delete
							</Button>
							<Button
								variant={"default"}
								className="flex-1 h-[42px] cursor-pointer bg-[#635FC719] hover:bg-[#635fc740] dark:bg-white dark:hover:bg-white !text-primary font-[700] text-[13px]"
								onClick={() => setConfirmDelete(false)}
								disabled={isPending}
							>
								Cancel
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				<Dialog open={editBoard} onOpenChange={setEditBoard}>
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
																// placeholder="Column name"
																className="text-[rgba(130, 143, 163, .25)] dark:caret-white caret-black text-black dark:text-white bg-white dark:bg-[#2B2C37] focus-visible:ring-0 flex-1 h-[40px] rounded-[4px] text-[13px] font-[500] border-muted/20 border-1 ring-0 outline-none ring-offset-0 focus-within:!border-primary"
																{...field}
															/>

															<button
																className="outline-none ring-0 cursor-pointer"
																type="button"
																onClick={() =>
																	remove(
																		index
																	)
																}
															>
																<XIcon
																	className="text-muted size-6"
																	strokeWidth={
																		3
																	}
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
										// onClick={() => append({ name: "" })}
									>
										+ Add New Column
									</Button>
									<Button
										className="font-[700] h-[42px] text-[13px] cursor-pointer"
										type="submit"
									>
										Save Changes
									</Button>
								</div>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>
		</header>
	);
}
