"use client";
import React from "react";
import Task from "./task";
import { useDroppable } from "@dnd-kit/core";
import { ColumnType } from "@/app/types";

export default function Column({ id, name, tasks }: ColumnType) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	const style = {
		color: isOver ? "green" : undefined,
	};
	return (
		<div ref={setNodeRef} style={style} className="min-w-[280px] shrink-0">
			<div className="mb-4">
				<h2 className="text-muted mb uppercase text-[12px] font-[700] tracking-[2px]">
					{name} ({tasks?.length ?? 0})
				</h2>
			</div>
			<div className="flex flex-col gap-4">
				{tasks?.map((task, index) => (
					<Task key={index} {...task} />
				))}
			</div>
		</div>
	);
}
