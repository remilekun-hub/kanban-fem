import React from "react";
import { db } from "@/db/drizzle";
import { boards } from "@/db/schema";
import Boardlink from "@/components/boardlink";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import Createboard from "@/components/create-board";
import { getBoards } from "../actions";

const BoardLists = async () => {
	const session = await auth();
	const userId = session?.user?.id as string;
	const data = await getBoards(userId);
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

			<Createboard userId={userId} />
		</div>
	);
};

export default BoardLists;
