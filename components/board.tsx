"use client";
import React from "react";
import AddColumn from "./add-column";
import Column from "./column";
import { TaskType } from "@/app/types";
import {
	DndContext,
	useSensor,
	useSensors,
	PointerSensor,
	closestCenter,
} from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/features/store";
import { moveTask } from "../lib/features/boardSlice";

export default function Board() {
	const dispatch = useDispatch();
	const boardState = useSelector((state: RootState) => state.board);
	// const boards: BoardType[] = [
	// 	{
	// 		id: "1233",
	// 		boardName: "Board one",
	// 		columns: [
	// 			{
	// 				id: "1290",
	// 				name: "Test This",
	// 				tasks: [
	// 					{
	// 						id: "xx1231",
	// 						taskName: "do this",
	// 						subtasks: [],
	// 						description: "yes we iljj",
	// 					},
	// 				],
	// 			},
	// 			{
	// 				id: "xu12",
	// 				name: "Test Again",
	// 				tasks: [
	// 					{
	// 						id: "xx991",
	// 						taskName: "done",
	// 						subtasks: [],
	// 						description: "yes we iljj",
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ];

	// const sensors = useSensors(useSensor(PointerSensor));

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	)

	// return (
	// 	<div className="h-full flex justify-center items-center">
	// 		<h1>Hello wokd</h1>
	// 	</div>
	// );
	type Active = {
		id: string | number; // Unique ID of the dragged item
		data?: {
			current?: any; // Optional: any extra data attached to the draggable item
		};
		rect?: any; // Optional: bounding box info
	};

	type Over = {
		id: string | number;
		data?: {
			current?: any;
		};
		rect?: any;
	} | null;

	const findColumnIdContainingTask = (
		activeTaskId: string
	): string | number | undefined => {
		const column = boardState?.columns?.find((col) =>
			col.tasks?.some((task) => task.id === activeTaskId)
		);

		return column?.id;
	};

	const handleDragEnd = ({
		active,
		over,
	}: {
		active: Active;
		over: Over;
	}) => {
		if (!over) return;

		const activeTaskId = active.id as string;

		const sourceColumnId = findColumnIdContainingTask(
			activeTaskId
		) as string;
		const targetColumnId = over.id as string;

		dispatch(moveTask({ activeTaskId, sourceColumnId, targetColumnId }));
	};

	return (
		<div className="w-full h-svh flex gap-6 px-4 lg:!px-6 !py-5 overflow-x-scroll scrollbar-hide">
			<DndContext
				collisionDetection={closestCenter}
				sensors={sensors}
				onDragEnd={handleDragEnd}
			>
				{boardState.columns?.map((col, index) => (
					<Column key={index} {...col} />
				))}
			</DndContext>
			<AddColumn />
		</div>
	);
}
