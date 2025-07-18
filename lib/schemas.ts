import { z } from "zod";

export const addColumnSchema = z.object({
	boardName: z.string().min(1, "required"),
	columnNames: z.array(
		z.object({
			name: z.string().min(1, "required"),
		})
	)
});
