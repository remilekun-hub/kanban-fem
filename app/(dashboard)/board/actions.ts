"use server";
import { db } from "@/db/drizzle";
import { boards, columns, tasks, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

export const getBoards = unstable_cache(
	async (userId: string) => {
		const data = await db
			.select()
			.from(boards)
			.where(eq(boards.userId, userId));
		return data;
	},

	["getBoards"],
	{
		tags: ["boards"],
	}
);

export const deleteBoard = async (userId: string, boardId: string) => {
	// Validate input early
	if (!userId || !boardId) {
		return {
			success: false,
			message: "Missing userId or boardId",
		};
	}

	// Check ownership
	const board = await db
		.select()
		.from(boards)
		.where(and(eq(boards.id, boardId), eq(boards.userId, userId)))
		.limit(1);

	if (!board || board.length === 0) {
		return {
			success: false,
			message: "Board not found or access denied",
		};
	}

	// Proceed with deletion
	await db
		.delete(boards)
		.where(and(eq(boards.id, boardId), eq(boards.userId, userId)));

	// Revalidate cache for all boards
	revalidateTag("boards");

	return {
		success: true,
		message: "Board deleted successfully",
	};
};

export async function addBoard(userId: string, boardName: string) {
	try {
		const user = await db.select().from(users).where(eq(users.id, userId));

		if (!user || user.length === 0) {
			return {
				success: false,
				error: `user not found.`,
			};
		}

		await db.insert(boards).values({
			boardName: boardName,
			userId: userId,
		});
		revalidateTag("boards");

		return {
			success: true,
			message: "Board Created successfully",
		};
	} catch (error) {
		console.error("Add column error:", error);
		return {
			success: false,
			error: "Failed to update board or add columns.",
		};
	}
}

export async function addUserColumn(
	userId: string,
	boardId: string,
	columnNames: { name: string; id: string }[],
	boardName: string
) {
	try {
		const board = await db
			.select()
			.from(boards)
			.where(and(eq(boards.id, boardId), eq(boards.userId, userId)))
			.limit(1);

		if (!board || board.length === 0) {
			return {
				success: false,
				error: `Board ID ${boardId} not found.`,
			};
		}

		let boardUpdated = false;
		let columnsInserted = false;

		if (board[0].boardName !== boardName) {
			await db
				.update(boards)
				.set({ boardName })
				.where(eq(boards.id, boardId));
			boardUpdated = true;
			revalidateTag("boards");
		}

		const existingColumns = await db
			.select({ name: columns.name })
			.from(columns)
			.where(eq(columns.boardId, boardId));

		const existingNames = new Set(existingColumns.map((col) => col.name));

		const newColumns = columnNames.filter(
			(col) => !existingNames.has(col.name)
		);

		if (newColumns.length > 0) {
			const valuesToInsert = newColumns.map((col) => ({
				id: col.id,
				name: col.name,
				boardId,
				userId,
			}));

			await db.insert(columns).values(valuesToInsert);
			columnsInserted = true;
		}

		if (boardUpdated || columnsInserted) {
			return {
				success: true,
				message: `${boardUpdated ? "Board name updated." : ""} ${
					columnsInserted
						? `Added ${newColumns.length} new column(s).`
						: ""
				}`.trim(),
			};
		} else {
			return {
				success: false,
				error: "No changes were made.",
			};
		}
	} catch (error) {
		console.error("Add column error:", error);
		return {
			success: false,
			error: "Failed to update board or add columns.",
		};
	}
}

export async function deleteUserColumn(
	userId: string,
	boardId: string,
	columnId: string
) {
	try {
		const column = await db
			.select()
			.from(columns)
			.where(
				and(
					eq(columns.id, columnId),
					eq(columns.userId, userId),
					eq(columns.boardId, boardId)
				)
			)
			.limit(1);

		if (!column || column.length === 0) {
			return;
		}

		await db
			.delete(columns)
			.where(
				and(
					eq(columns.id, columnId),
					eq(columns.userId, userId),
					eq(columns.boardId, boardId)
				)
			);

		return {
			success: true,
			message: "Column deleted.",
		};
	} catch (error) {
		console.error("Delete column error:", error);
		return {
			success: false,
			error: "Failed to delete column.",
		};
	}
}

export async function getBoardById(userId: string, boardId: string) {
	try {
		const result = await db
			.select({
				board: boards,
				column: {
					id: columns.id,
					name: columns.name,
				},
				task: {
					id: tasks.id,
					taskName: tasks.taskName,
					description: tasks.description,
				},
			})
			.from(boards)
			.leftJoin(columns, eq(columns.boardId, boards.id))
			.leftJoin(tasks, eq(tasks.columnId, columns.id))
			.where(and(eq(boards.id, boardId), eq(boards.userId, userId)));
		return result;
	} catch (error) {
		console.error("failed to get board", error);
		return {
			success: false,
			error: "Failed to get board",
		};
	}
}

// export async function Movetask(userId: string, boardId: string, taskId:string, columnId:string) {
// 	try {
// 		// const result = await db
// 		// 	.select({
// 		// 		board: boards,
// 		// 		column: {
// 		// 			id: columns.id,
// 		// 			name: columns.name,
// 		// 		},
// 		// 		task: {
// 		// 			id: tasks.id,
// 		// 			taskName: tasks.taskName,
// 		// 			description: tasks.description,
// 		// 		},
// 		// 	})
// 		// 	.from(boards)
// 		// 	.leftJoin(columns, eq(columns.boardId, boards.id))
// 		// 	.leftJoin(tasks, eq(tasks.columnId, columns.id))
// 		// 	.where(and(eq(boards.id, boardId), eq(boards.userId, userId)));
// 		// return result;
// 	    //  await db.insert(columns)
// 			const board = db.select().from(boards).where(and(eq(boards.id, boardId))).limit(1)
// 			// const column = db.select().from(columns).where(and(eq(columns.userId, userId), eq(columns.id, columnId))).limit(1)
// 	} catch (error) {
// 		console.error("failed to move task", error);
// 		return {
// 			success: false,
// 			error: "Failed to move task",
// 		};
// 	}
// }
