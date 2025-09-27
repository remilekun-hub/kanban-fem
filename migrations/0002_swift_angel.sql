ALTER TABLE "users" RENAME COLUMN "name" TO "password";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");