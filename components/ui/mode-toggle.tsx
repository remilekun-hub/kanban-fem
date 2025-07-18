"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import Moon from "@/app/icons/moon";
import Sun from "@/app/icons/sun";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	const isDark = theme === "dark";

	return (
		<div className="rounded-[6px] inline-flex justify-center items-center py-3 bg-[#EAF0FB] dark:bg-foreground w-full mr-6.5 gap-6.5">
			<span className="sr-only">Toggle theme</span>
			<Sun />
			<Switch
				checked={isDark}
				onCheckedChange={() => setTheme(isDark ? "light" : "dark")}
			/>
			<Moon />
		</div>
	);
}
