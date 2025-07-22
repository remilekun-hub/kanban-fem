import { useDraggable } from "@dnd-kit/core";
import React, { useState } from "react";
import type { TaskType } from "@/app/types";
import { CSS } from "@dnd-kit/utilities";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Subtasksitem from "./subtasksitem";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { deleteTask } from "@/lib/features/boardSlice";

export default function Task({
	taskName,
	description,
	id,
	subtasks,
}: TaskType) {
	const [openSubTasks, setOpenSubTasks] = useState(false);
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
	});
	const style = transform
		? {
				transform: CSS.Translate.toString(transform),
		  }
		: undefined;

	const totalSubTasks = subtasks?.length;
	const completedSubTasks = subtasks?.filter((s) => s.completed === true);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const dispatch = useDispatch()

	return (
		<div>
			<div
				ref={setNodeRef}
				style={style}
				{...listeners}
				{...attributes}
				className="bg-white dark:bg-sidebar rounded-[8px] !px-4 !py-[20px] hover:cursor-pointer drag:!cursor-drag"
				onClick={(e) => {
					e.stopPropagation();
					setOpenSubTasks(true);
				}}
			>
				<h3 className="inline-block text-black dark:text-white text-[15px] font-[700] hover:text-primary leading-[19px] mb-[8px] dark:hover:text-primary">
					{taskName}
				</h3>
				<p className="text-muted text-[12px] font-[700] leading-[15px]">
					{totalSubTasks
						? `${completedSubTasks?.length} of ${totalSubTasks} subtasks `
						: "0 subtasks"}
				</p>
			</div>

			<Dialog open={openSubTasks} onOpenChange={setOpenSubTasks}>
				<DialogContent
					className="bg-white dark:bg-[#2B2C37]"
					showCloseButton={false}
					// showCloseButton={false}
				>
					<DialogHeader className="flex flex-row justify-between items-center">
						<DialogTitle className="text-black dark:text-white font-[700]">
							{taskName}
						</DialogTitle>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="outline-none ring-0 focus-within:ring-0">
									<MoreVertical className="text-muted size-7 hover:cursor-pointer" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="!w-[150px] mr-0 mt-4 !bg-white dark:bg-background shadow-[0_10px_20px_rgba(54, 78, 126, .25)]">
								<DropdownMenuItem className="hover:!bg-none cursor-pointer py-2.5 focus:!bg-white">
									<button
										className="w-full text-start text-[13px] font-[500] text-muted cursor-pointer"
										// onClick={() => setEditBoard(true)}
									>
										Edit Task
									</button>
								</DropdownMenuItem>
								<DropdownMenuItem className="hover:!bg-none cursor-pointer py-2.5 focus:!bg-white">
									<button
										className="w-full text-start text-[13px] font-[500] text-[#ea5555] cursor-pointer"
										onClick={() => {
											setOpenSubTasks(false);
											setConfirmDelete(true);
										}}
									>
										Delete Task
									</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</DialogHeader>
					<p className="text-muted font-[500] text-[13px] leading-[23px] mt-1.5">
						{description}
					</p>

					<p className="text-muted text-[12px] font-[700] leading-[15px] tracking-[2.4px]">
						Subtasks ({completedSubTasks?.length} of {totalSubTasks}{" "}
						)
					</p>

					<div className="flex flex-col gap-2">
						{subtasks?.map((s, index) => (
							<Subtasksitem key={index} {...s} />
						))}
					</div>
					{/* <Form {...form}>
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
									Save Changes
								</Button>
							</div>
						</form>
					</Form> */}
				</DialogContent>
			</Dialog>

			<AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
				<AlertDialogContent className="bg-white dark:bg-background">
					<AlertDialogHeader>
						<AlertDialogTitle className="text-[#ea5555] font-[700] text-[18px] mb-4">
							Delete this board?
						</AlertDialogTitle>
						<AlertDialogDescription className="font-[500] text-[13px] leading-[23px] text-muted">
							`Are you sure you want to delete the "{taskName}"
							task and its subtasks? This action cannot be
							reversed.`
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter className="w-full flex flex-col gap-4 items-stretch md:flex-row sm:justify-start mt-2 mb-2">
						<Button
							variant={"destructive"}
							className="flex-1 bg-[#ea5555] cursor-pointer hover:bg-[#FF9898] text-[13px] font-[700] leading-[23px] h-[42px] text-[13px]"
							onClick={()=> dispatch(deleteTask({id}))}
						>
							Delete
						</Button>
						<Button
							variant={"default"}
							className="flex-1 h-[42px] cursor-pointer bg-[#635FC719] hover:bg-[#635fc740] dark:bg-white dark:hover:bg-white !text-primary font-[700] text-[13px]"
							onClick={() => setConfirmDelete(false)}
						>
							Cancel
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
