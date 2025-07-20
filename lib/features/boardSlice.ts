"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BoardType, TaskType } from "../../app/types";

// export interface BoardState {
// 	board: BoardType;
// }

const initialState: BoardType = {
	boardName: "sjbf",
	columns: [
		{
			id: "f",
			name: "whf",
			tasks: [{ id: "ef", taskName: "jef", description: "jkefj" }],
		},
		{
			id: "fj",
			name: "whfj",
			tasks: [{ id: "efjkj", taskName: "jenf", description: "jkefj" }],
		},

	],
	id: "jsvdj",
};

type moveTaskType = {
	activeTaskId: string;
	sourceColumnId: string;
	targetColumnId: string;
};

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		createBoard: (state, action: PayloadAction<BoardType>) => {
			const {
				payload: { id, boardName, columns },
			} = action;

			const newBoard = {
				id,
				boardName,
				columns: [...columns],
			};

			state = newBoard;
			// [...state]
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			// state.value += 1
		},
		moveTask: (state, action: PayloadAction<moveTaskType>) => {
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

				// Remove the task from the source and add to target
				const movedTask = sourceColumn.tasks?.splice(
					taskIndex as number,
					1
				);
				if (movedTask) {
					targetColumn.tasks?.push({
						id: movedTask[0].id,
						taskName: movedTask[0].taskName,
						description: movedTask[0].description,
						// subtasks: [...movedTask[0]?.subtasks],
					});
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
		decrement: (state) => {
			// state.value -= 1
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			// state.value += action.payload
		},
	},
});

// Action creators are generated for each case reducer function
export const { createBoard, decrement, incrementByAmount, moveTask } = boardSlice.actions;

export default boardSlice.reducer;
