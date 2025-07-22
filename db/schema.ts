import { integer, text, boolean, pgTable, uuid } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
	id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
	text: text("text").notNull(),
	done: boolean("done").default(false).notNull(),
});
