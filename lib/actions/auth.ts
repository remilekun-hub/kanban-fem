"use server";

import { signIn } from "@/auth";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

type AuthCred = {
	email: string;
	password: string;
};

export const singInWithCred = async (params: AuthCred) => {
	const { email, password } = params;
	try {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			return {
				success: false,
				error: result.error,
			};
		}

		return {
			success: true,
		};
	} catch (error) {
		console.log(error, "signin error");
		return {
			success: false,
			error: "error signing in",
		};
	}
};

export const signUp = async (params: AuthCred) => {
	const { email, password } = params;
	const existingUser = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);
	if (existingUser.length > 0) {
		return {
			success: false,
			error: "user already exists.",
		};
	}

	const hashedPassword = await hash(password, 10);

	try {
		await db.insert(users).values({
			email: email,
			password: hashedPassword,
		});
		return {
			success: true,
		};
	} catch (error) {
		console.log(error, "signup error");
		return {
			success: false,
			error: "error signing up",
		};
	}
};
