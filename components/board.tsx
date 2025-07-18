"use client";
import React, { useState } from "react";
import AddColumn from "./add-column";
import Column from "./column";
import { BoardType } from "@/app/types";
import { DndContext, useSensor, useSensors, PointerSensor, closestCenter } from "@dnd-kit/core";

export default function Board() {
	const boards: BoardType[] = [
		{
			id: "1233",
			boardName: "Board one",
			columns: [
				{
					id: "1290",
					columnName: "Test This",
					tasks: [
						{
							id: "xx1231",
							taskName: "do this",
							subtasks: [],
							description: "yes we iljj",
						},
					],
				},
				{
					id: "xu12",
					columnName: "Test Again",
					tasks: [
						{
							id: "xx991",
							taskName: "done",
							subtasks: [],
							description: "yes we iljj",
						},
					],
				},
			],
		},
	];


	const [data, setData] = useState(boards);
	const sensors = useSensors(useSensor(PointerSensor));


	return (
		<div className="w-full h-full flex gap-6 px-4 lg:!px-6 !py-5 overflow-x-scroll scrollbar-hide">
			<DndContext collisionDetection={closestCenter} sensors={sensors}>
				{boards[0].columns.map((col, index) => (
					<Column key={index} {...col} />
				))}
			</DndContext>
			<AddColumn />
		</div>
	);
}
