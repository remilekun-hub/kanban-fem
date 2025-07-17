"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function AddColumn() {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<div className="cursor-pointer mt-[29px] flex h-[95%] justify-center items-center bg-foreground dark:bg-[#22232E] rounded-[6px] shrink-0 min-w-[280px]">
				<button
					className="text-muted font-[700] text-[24px] leading-[30px] hover:text-primary"
					onClick={() => setOpen(true)}
				>
					+ New Column
				</button>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent className="bg-white dark:bg-[#2B2C37]">
					<DialogHeader>
						<DialogTitle className="text-black dark:text-white">
							Are you absolutely sure?
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently
							delete your account and remove your data from our
							servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
