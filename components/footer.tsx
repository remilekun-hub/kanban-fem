"use client";
import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { SidebarFooter, useSidebar } from "./ui/sidebar";
import EyeOff from "@/app/icons/eyeoff";

export default function Footer() {
	const { setOpen } = useSidebar();
	return (
		<SidebarFooter className="!px-0">
			<ModeToggle />
			<Button
				variant={"default"}
				className="cursor-pointer !bg-white hover:!bg-white mb-7 !pl-6 mr-6 !py-6 font-[700] text-[15px] leading-[19px] rounded-l-none justify-start text-muted hover:text-primary dark:text-muted dark:hover:!bg-white dark:!bg-[#2B2C37]"
				type="button"
				onClick={() => setOpen(false)}
			>
				<EyeOff className="text-[#828FA3] ml-1.5" /> Hide Sidebar
			</Button>
		</SidebarFooter>
	);
}
