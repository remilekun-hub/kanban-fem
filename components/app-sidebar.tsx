"use client";

import React, { Suspense } from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import BoardIcon from "@/app/icons/board-icon";
import Image from "next/image";
import Footer from "./footer";
import BoardLists from "./boardlists";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader className="flex flex-row !flex-start items-center gap-[15px] h-[80px] pl-5">
				<Image
					width={25}
					height={25}
					src={"/kanban-logo.svg"}
					alt="kanban logo"
				/>
				<h1 className="text-black text-[32px] font-[700] dark:text-white">
					kanban
				</h1>
			</SidebarHeader>
			<SidebarContent>
				

				<Suspense fallback={"Loading board lists"}>
				
					<BoardLists />
				</Suspense>
				<Button
					variant={"default"}
					className="!pl-6 mr-6 !py-6 font-[700] text-[15px] leading-[19px] rounded-l-none justify-start"
				>
					<BoardIcon className="mr-2" /> Platform Launch
				</Button>
				<Button
					variant={"default"}
					className="!pl-6 mr-6 justofy-start !py-6 font-[700] text-[15px] leading-[19px] rounded-l-none hover:cursor-pointer !text-primary !bg-transparent justify-start"
				>
					<BoardIcon className="mr-2" />+ Create New Board
				</Button>
				{/* n
				<NavMain items={data.navMain} />
				jsdf */}
			</SidebarContent>

			<Footer />

			<SidebarRail />
		</Sidebar>
	);
}
