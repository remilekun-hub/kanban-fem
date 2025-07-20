"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BoardType } from "../../app/types";

export interface BoardState {
	boards: BoardType[];
}

const initialState: BoardState = {
	boards: [],
};

export const boardSlice = createSlice({
	name: "boards",
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

			state.boards = [...state.boards, newBoard];
			// [...state]
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			// state.value += 1
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
export const { createBoard, decrement, incrementByAmount } = boardSlice.actions;

export default boardSlice.reducer;
