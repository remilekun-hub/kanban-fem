import { z } from "zod";

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
