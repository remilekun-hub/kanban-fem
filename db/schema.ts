import { relations } from "drizzle-orm";
import {
	integer,
	text,
	boolean,
	pgTable,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
});

export const boards = pgTable("boards", {
	id: uuid("id").primaryKey().defaultRandom().unique(),
	boardName: varchar("name", { length: 255 }).notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),
});

export const columns = pgTable("columns", {
	id: uuid("id").primaryKey().defaultRandom().unique(),
	name: varchar("name", { length: 255 }).notNull().unique(),
	boardId: uuid("board_id")
		.notNull()
		.references(() => boards.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id),
});

export const tasks = pgTable("tasks", {
	id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
	taskName: varchar("task_name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	columnId: uuid("column_id")
		.notNull()
		.references(() => columns.id, { onDelete: "cascade" }),
});

export const subtasks = pgTable("subtasks", {
	id: uuid("id").primaryKey().defaultRandom().notNull().unique(),
	title: varchar("title", { length: 255 }).notNull(),
	completed: boolean("completed").notNull().default(false),
	taskId: uuid("task_id")
		.notNull()
		.references(() => tasks.id, { onDelete: "cascade" }),
	// column: varchar('column', { length: 255 }), // optional label
});

// export const userRelations = relations(users, ({ many }) => ({
//   boards: many(boards),
// }));
