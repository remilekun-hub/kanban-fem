import { z } from "zod";

export const createBoardSchema = z.object({
	name: z.string().min(1, { message: "required" }),
	columnNames: z.array(
		z.object({
			name: z.string().min(1, "required"),
			id: z.string().min(1, "required"),
		})
	),
	id: z.uuid().min(1, "required"),
});

export const addColumnSchema = z.object({
	boardName: z.string().min(1, "required"),
	columnNames: z.array(
		z.object({
			name: z.string().min(1, "required"),
			// id: z.uuid(),
		})
	),
	id: z.string().min(1, "required"),
});

export const addTaskSchema = z.object({
	name: z.string().min(1, "required"),
	description: z.string().min(1, "required"),
	columnId: z.string().min(1, "status required"),
	subtasks: z.array(
		z.object({
			title: z.string().min(1, "required"),
			completed: z.boolean(),
		})
	),
});

export const SignUpSchema = z.object({
	email: z.email(),
	password: z.string().min(1, "required"),
});
