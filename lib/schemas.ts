import { z } from "zod";


export const createBoardSchema = z.object({
	name: z.string().min(1, {message:"required"}),
	columnNames: z.array(
		z.object({
			name: z.string().min(1, "required"),
			id: z.string().min(1, "required"),
			
		})
	),
	id: z.uuid({version:'v4'}).min(1, "required"),
});

export const addColumnSchema = z.object({
	boardName: z.string().min(1, "required"),
	columnNames: z.array(
		z.object({
			name: z.string().min(1, "required"),
		})
	),
	id: z.string().min(1, "required"),
});

export const addTaskSchema = z.object({
	name: z.string().min(1, "required"),
	description: z.string().min(1, "required"),
	subtasks: z.array(
		z.object({
			title: z.string().min(1, "required"),
			completed: z.boolean(),
		})
	),
});
