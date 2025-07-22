import { SubTaskType } from "@/app/types";
import React, { ChangeEventHandler } from "react";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { updateSubtask } from "../lib/features/boardSlice";

export default function Subtasksitem({ id, title, completed }: SubTaskType) {
	const dispatch = useDispatch();
	const onCheckChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (e.target.checked) {
			dispatch(
				updateSubtask({
					id: id,
					status: true,
				})
			);
		} else {
			dispatch(
				updateSubtask({
					id: id,
					status: false,
				})
			);
		}
	};
	return (
		<div className="bg-[#f4f7fd] rounded-[4px] flex items-center p-3 gap-4">
			<input
				type="checkbox"
				name=""
				id=""
				className="size-[17px]"
				checked={completed}
				onChange={onCheckChange}
			/>
			<p
				className={cn(
					`text-[12px] font-[700]`,
					completed ? "line-through text-muted" : "text-black"
				)}
			>
				{title}
			</p>
		</div>
	);
}
