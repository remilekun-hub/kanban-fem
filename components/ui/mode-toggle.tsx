"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Moon from "@/app/icons/moon";
import Sun from "@/app/icons/sun";
import Switch2 from "./switch-2";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		// Avoid hydration mismatch
		return null;
	}

	const isDark = theme === "dark";

	return (
		<div className="mb-5 rounded-[6px] w-[85%] mx-auto flex justify-center items-center py-[12px] bg-[#EAF0FB] dark:bg-foreground  gap-6.5">
			<span className="sr-only">Toggle theme</span>
			<Sun />

			<Switch2
				checked={isDark}
				onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
			/>
			<Moon />
		</div>
	);
}
