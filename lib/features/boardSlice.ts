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

type addTaskPayloadType = {
  columnId: string;
  task: TaskType;  
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
		removeColumn: (state, action: PayloadAction<{ columnId: string }>) => {
			const { columnId } = action.payload;
		
		
			state.columns = state.columns.filter((col) => col.id !== columnId);
		},
		addTask: (state, action: PayloadAction<addTaskPayloadType>) => {
			const { columnId, task } = action.payload;
		
			// Find the correct column
			const column = state.columns.find((col) => col.id === columnId);
			if (!column) {
				console.warn(`Column ${columnId} not found in board state.`);
				return;
			}
		
			// Ensure column.tasks exists
			if (!column.tasks) {
				column.tasks = [];
			}
		
			// Add the new task with its subtasks
			column.tasks.push({
				...task,
				subtasks: task.subtasks?.map((st) => ({
					id: st.id,
					title: st.title,
					completed: st.completed,
					taskId:st.taskId
				})) || [],
			});
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
		removeBoard: (state) => {
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
	removeColumn,
	incrementByAmount,
	addTask,
	moveTask,
	deleteTask,
	updateSubtask,
	removeBoard,
} = boardSlice.actions;

export default boardSlice.reducer;
