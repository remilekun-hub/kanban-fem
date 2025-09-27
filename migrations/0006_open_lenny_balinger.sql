CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"column_id" uuid NOT NULL,
	CONSTRAINT "tasks_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_column_id_columns_id_fk" FOREIGN KEY ("column_id") REFERENCES "public"."columns"("id") ON DELETE no action ON UPDATE no action;