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
import { Button } from "./ui/button";
import { useForm, useFieldArray } from "react-hook-form";
import { addColumnSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddColumn() {
	const [open, setOpen] = useState(false);

	const { control } = useForm({
		resolver: zodResolver(addColumnSchema),
		defaultValues: {
			boardName: "",
			columnNames: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "columnNames",
	});

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
						<DialogTitle className="text-black dark:text-white font-[700]">
							Edit board
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently
							delete your account and remove your data from our
							servers.
						</DialogDescription>
					</DialogHeader>

					<h3 className="font-[700] text-[12px] text-black dark:text-white">
						Board Columns
					</h3>
					<div>
						{fields.map((field, index) => (
							<div>hello</div>
						))}
					</div>
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
				</DialogContent>
			</Dialog>
		</div>
	);
}
