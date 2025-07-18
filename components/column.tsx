"use client";
import React from "react";
import Task from "./task";
import { useDroppable } from "@dnd-kit/core";
import { ColumnType } from "@/app/types";

export default function Column({ id, columnName, tasks }: ColumnType) {
	const { isOver, setNodeRef } = useDroppable({
		id: id,
	});
	const style = {
		color: isOver ? "green" : undefined,
	};
	return (
		<div ref={setNodeRef} style={style} className="min-w-[280px] shrink-0 border border-red-900">
			<div className="mb-4">
				<h2 className="text-muted mb uppercase text-[12px] font-[700] tracking-[2px]">
					{columnName} (0)
				</h2>
			</div>
			<div className="flex flex-col gap-4.5">
				{tasks.map((task, index) => (
					<Task key={index} {...task} />
				))}
			</div>
		</div>
	);
}
