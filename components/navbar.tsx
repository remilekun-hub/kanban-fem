"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { MoreVertical, PlusIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function Navbar() {
	const { open } = useSidebar();
	const [confirmDelete, setConfirmDelete] = useState(false);
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
					Board NAME
				</h1>
				<div className="flex items-center">
					<Button
						variant={"default"}
						className="flex md:hidden !px-4 mr-4 font-[700] text-[15px] leading-[19px] rounded-[24px] h-[30px] justify-center items-center"
					>
						<PlusIcon strokeWidth={4} />
					</Button>

					<Button
						variant={"default"}
						className="hidden md:flex !px-6 !py-6 mr-4 font-[700] text-[15px] leading-[19px]"
					>
						+ Add New Task
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button className="outline-none ring-0 focus-within:ring-0">
								<MoreVertical className="text-muted size-7 hover:cursor-pointer" />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-10 mr-16 mt-5">
							<DropdownMenuItem className="hover:!bg-none cursor-pointer">
								<button className="w-full text-start">
									Edit
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem className="hover:!bg-none cursor-pointer">
								<button
									className="w-full text-start"
									onClick={() => setConfirmDelete(true)}
								>
									Delete
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
								Are you sure you want to delete the "Roadmap"
								board? This action will remove all columns and
								tasks and cannot be reversed.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter className="w-full flex flex-col gap-4 items-stretch md:flex-row sm:justify-start mt-2 mb-2">
							<Button
								variant={"destructive"}
								className="flex-1 bg-[#ea5555] cursor-pointer hover:bg-[#FF9898] text-[13px] font-[700] leading-[23px] h-[42px] text-[13px]"
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
		</header>
	);
}
