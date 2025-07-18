"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import Moon from "@/app/icons/moon";
import Sun from "@/app/icons/sun";

export function ModeToggle() {
	const { setTheme, theme } = useTheme();
	const [isChecked, setIsChecked] = React.useState(theme === "dark");
	console.log({ theme, isChecked });

	React.useEffect(() => {
		if (theme === "dark") {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [theme, setIsChecked]);

	return (
		<div className="rounded-[6px] flex justify-center items-center py-3 bg-foreground w-full mr-6 gap-6.5">
			<span className="sr-only">Toggle theme</span>

			<Sun />
			<Switch
				key={theme}
				checked={isChecked}
				onCheckedChange={() =>
					setTheme(theme === "dark" ? "light" : "dark")
				}
			/>
			<Moon />
		</div>
	);
}
