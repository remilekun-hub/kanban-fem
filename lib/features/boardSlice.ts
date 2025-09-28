"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BoardType, TaskType } from "../../app/types";

const initialState: BoardType = {
	boardName: "",
	columns: [],
	id: "",
};

type moveTaskPayloadType = {
	activeTaskId: string;
	sourceColumnId: string;
	targetColumnId: string;
};

type updateSubTaskPayloadType = {
	id: string;
	status: boolean;
};

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		createBoard: (state, action: PayloadAction<BoardType>) => {
			const {
				payload: { id, boardName, columns },
			} = action;

			state.id = id;
			state.boardName = boardName;
			state.columns = [...columns];
		},
		createColumn: (state, action: PayloadAction<BoardType>) => {
			const {
				payload: { id, boardName, columns },
			} = action;

			state.id = id;
			state.boardName = boardName;
			state.columns = [...columns];
		},
		moveTask: (state, action: PayloadAction<moveTaskPayloadType>) => {
			const { activeTaskId, sourceColumnId, targetColumnId } =
				action.payload;
			if (sourceColumnId !== targetColumnId) {
				// Find the source and target columns
				const sourceColumn = state.columns.find(
					(col) => col.id === sourceColumnId
				);
				const targetColumn = state.columns.find(
					(col) => col.id === targetColumnId
				);

				if (!sourceColumn || !targetColumn) return;

				// Find the task in the source column
				const taskIndex = sourceColumn.tasks?.findIndex(
					(task) => task.id === activeTaskId
				);
				if (taskIndex === -1) return;

				const movedTask = sourceColumn.tasks?.splice(
					taskIndex as number,
					1
				);
				if (movedTask) {
					targetColumn.tasks?.push({
						id: movedTask[0].id,
						taskName: movedTask[0].taskName,
						description: movedTask[0].description,
						subtasks: movedTask[0].subtasks,
					});
				}
			}
		},
		deleteTask: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;

			for (const column of state.columns) {
				const taskIndex = column?.tasks?.findIndex(
					(task) => task.id === id
				);
				if (taskIndex !== -1) {
					column?.tasks?.splice(taskIndex as number, 1);
					return;
				}
			}
		},
		deleteBoard: (state) => {
			state = {
				boardName: "",
				columns: [],
				id: "",
			};
		},
		updateSubtask: (
			state,
			action: PayloadAction<updateSubTaskPayloadType>
		) => {
			const { id, status } = action.payload;
			for (const column of state.columns) {
				for (const task of column?.tasks ?? []) {
					const subtask = task?.subtasks?.find((st) => st.id === id);
					if (subtask) {
						subtask.completed = status;
						return;
					}
				}
			}
		},

		incrementByAmount: (state, action: PayloadAction<number>) => {
			// state.value += action.payload
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	createBoard,
	createColumn,
	incrementByAmount,
	moveTask,
	deleteTask,
	updateSubtask,
} = boardSlice.actions;

export default boardSlice.reducer;
