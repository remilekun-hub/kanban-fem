"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BoardType } from "../../app/types";

// export interface BoardState {
//   value: number
// }

const initialState: BoardType[] = [];

export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		increment: (state) => {
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
export const { increment, decrement, incrementByAmount } = boardSlice.actions;

export default boardSlice.reducer;
