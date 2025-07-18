"use client";

import * as React from "react";
// import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import Moon from "@/app/icons/moon";
import Sun from "@/app/icons/sun";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<div className="rounded-[6px] flex justify-center items-center py-3 bg-foreground w-full mr-6 gap-6.5">
			<span className="sr-only">Toggle theme</span>

			<Sun />
			<Switch
				checked={theme === "dark"}
				onCheckedChange={() =>
					setTheme(theme === "dark" ? "light" : "dark")
				}
			/>
			<Moon />
		</div>
	);
}
