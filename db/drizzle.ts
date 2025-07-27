import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

console.log("DATABASE_URL in drizzle.ts:", process.env.DATABASE_URL);
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set in environment variables");
}

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
