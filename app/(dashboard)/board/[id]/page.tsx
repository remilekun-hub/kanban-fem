import Board from "@/components/board";
import React from "react";

type Props = {
	params: {
		id: string;
	};
};

export default function SingleBoard({ params: { id } }: Props) {
	return (
		<div>
			{/* <Board /> */}
		</div>
	);
}
