"use server";
import { db } from "@/db/drizzle";
import { boards, columns } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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

		// Update board name if changed
		if (board[0].boardName !== boardName) {
			await db
				.update(boards)
				.set({ boardName })
				.where(eq(boards.id, boardId));
			boardUpdated = true;
		}

		// Fetch existing columns
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
				message: `${
					boardUpdated ? "Board name updated." : ""
				} ${columnsInserted ? `Added ${newColumns.length} new column(s).` : ""}`.trim(),
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
