import { useDraggable } from "@dnd-kit/core";
import React from "react";
import type { TaskType } from "@/app/types";
import {CSS} from '@dnd-kit/utilities';

export default function Task({
	taskName,
	description,
	id,
	subtasks,
}: TaskType) {
	const { attributes, listeners, setNodeRef, transform,  } = useDraggable({
		id: id,
	});
	const style = transform
		? {
				transform:  CSS.Translate.toString(transform),

		  }
		: undefined;

	const totalSubTasks = subtasks.length;
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="bg-white dark:bg-sidebar rounded-[8px] !px-4 !py-[20px] hover:cursor-grab"
			
		>
			<h3 className="inline-block text-black dark:text-white text-[15px] font-[700] hover:text-primary leading-[19px] mb-[8px] dark:hover:text-primary">
				{taskName}
			</h3>
			<p className="text-muted text-[12px] font-[700] leading-[15px]">
				1 of {totalSubTasks} subtasks
			</p>
		</div>
	);
}
