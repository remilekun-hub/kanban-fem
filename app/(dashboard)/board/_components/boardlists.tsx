import React from "react";
import { db } from "@/db/drizzle";
import { boards } from "@/db/schema";
import Boardlink from "@/components/boardlink";

const BoardLists = async () => {
	const data = await db.select().from(boards);
	return (
		<div>
			<h2 className="text-muted mb uppercase text-[12px] font-[700] tracking-[2px] pl-5 mt-5 mb-4">
				ALL BOARDS ({data.length})
			</h2>

			{data.map((board) => (
				<Boardlink
					key={board.id}
					boardName={board.boardName}
					id={board.id}
				/>
			))}
		</div>
	);
};

export default BoardLists;
