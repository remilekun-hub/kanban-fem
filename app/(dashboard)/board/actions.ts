"use server";
import { db } from "@/db/drizzle";
import { boards, columns, subtasks, tasks, users } from "@/db/schema";
import { ConsoleLogWriter, and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBoardWithColumnsAndTasks(
	boardId: string,
	userId: string
) {
	// Fetch columns for the board
	const columnsData = await db
		.select({
			id: columns.id,
			name: columns.name,
		})
		.from(columns)
		.innerJoin(boards, eq(columns.boardId, boards.id))
		.where(and(eq(boards.id, boardId), eq(boards.userId, userId)));

	// For each column, fetch its tasks
	const columnsWithTasks = await Promise.all(
		columnsData.map(async (col) => {
			const tasksData = await db
				.select({
					id: tasks.id,
					taskName: tasks.taskName,
					description: tasks.description,
				})
				.from(tasks)
				.where(eq(tasks.columnId, col.id));

			return {
				...col,
				tasks: tasksData,
			};
		})
	);

	// Fetch the board details
	const boardData = await db
		.select({
			id: boards.id,
			boardName: boards.boardName,
		})
		.from(boards)
		.where(and(eq(boards.id, boardId), eq(boards.userId, userId)))
		.limit(1);

	if (boardData.length === 0)
		return {
			success: false,
			message: "board not found",
		};

	return {
		success: true,
		message: "Board fetched successffully",
		data: {
			...boardData[0],
			columns: columnsWithTasks,
		},
	};
}

export const getBoards = async (userId: string) => {
	const data = await db
		.select()
		.from(boards)
		.where(eq(boards.userId, userId)); // triggers a fresh fetch for the page
	return data;
};

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

	revalidatePath("/board");

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
		revalidatePath("/board");

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
			revalidatePath(`/board/${boardId}`);
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

export async function deleteTaskDb(
	userId: string,
	boardId: string,
	columnId: string,
	taskId: string
) {
	try {
		const deleted = await db
			.delete(tasks)
			.where(and(eq(tasks.id, taskId), eq(tasks.columnId, columnId)));
		if (!deleted) {
			return { success: false, message: "Task not found." };
		}

		return {
			success: true,
			message: "Task deleted successfully.",
		};
	} catch (error) {
		return {
			success: false,
			message: "Failed to delete task.",
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

export async function getColumns(boardId: string, userId: string) {
	try {
		if (!userId) {
			return {
				success: false,
				message: "please log in to continue",
			};
		}
		const boardColumns = await db
			.select({
				columnId: columns.id,
				name: columns.name,
			})
			.from(columns)
			.innerJoin(boards, eq(columns.boardId, boards.id))
			.where(and(eq(boards.id, boardId), eq(boards.userId, userId)));

		return boardColumns;
	} catch (error) {
		return {
			success: false,
			message: "failed to get columns",
		};
	}
}

export async function createTask(
	taskName: string,
	description: string,
	columnId: string,
	boardId: string,
	userId: string,
	subtasksList?: { title: string; completed: boolean }[]
) {
	try {
		// Check column belongs to board & user
		const columnCheck = await db
			.select({
				columnId: columns.id,
				boardId: boards.id,
			})
			.from(columns)
			.innerJoin(boards, eq(columns.boardId, boards.id))
			.where(
				and(
					eq(columns.id, columnId),
					eq(boards.id, boardId),
					eq(boards.userId, userId)
				)
			)
			.limit(1);

		if (columnCheck.length === 0) {
			return {
				success: false,
				message: "Unauthorized or invalid board/column.",
			};
		}

		// Insert the task
		const [newTask] = await db
			.insert(tasks)
			.values({ taskName, description, columnId })
			.returning();

		// Insert subtasks if any
		type CreatedSubTaskType = {
			id: string; // DB-generated
			title: string;
			completed: boolean;
			taskId: string;
		};
		let createdSubtasks: CreatedSubTaskType[] = [];
		if (subtasksList?.length) {
			createdSubtasks = await db
				.insert(subtasks)
				.values(
					subtasksList.map((st) => ({
						title: st.title,
						completed: st.completed,
						taskId: newTask.id,
					}))
				)
				.returning({
					id: subtasks.id,
					title: subtasks.title,
					completed: subtasks.completed,
					taskId: subtasks.taskId,
				});
		}

		// Return the single task with its subtasks
		return {
			success: true,
			message: "Task Created",
			data: {
				columnId,
				task: {
					id: newTask.id,
					taskName: newTask.taskName,
					description: newTask.description,
					columnId: newTask.columnId,
					subtasks: createdSubtasks.map((st) => ({
						id: st.id,
						title: st.title,
						completed: st.completed,
					})),
				},
			},
		};
	} catch (error) {
		console.error(error);
		return { success: false, message: "Failed to create task: " + error };
	}
}
