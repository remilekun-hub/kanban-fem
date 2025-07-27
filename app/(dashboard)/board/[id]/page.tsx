import Board from "@/components/board";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

export default async function SingleBoard({ params: { id } }: Props) {
	const boardId = await id
	return (
		<div>
			{/* <Board /> */}
		</div>
	);
}
