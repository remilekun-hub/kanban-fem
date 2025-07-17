import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

export default function Navbar() {
	return (
		<header className="w-full h-[80px] bg-white dark:bg-sidebar flex !items-center !justify-between !px-5">
			<div className="flex flex-row !flex-start items-center gap-[15px]">
				<Image
					width={25}
					height={25}
					src={"/kanban-logo.svg"}
					alt="kanban logo"
				/>
				<h1 className="text-black text-[32px] font-[700] dark:text-white">
					kanban
				</h1>
			</div>
			<div className="flex-1 ml-[108px] justify-between flex items-center">
				<h1 className="text-black dark:text-white font-[700] text-[1.315rem]">Board NAME</h1>
				<div className="flex items-center">
					<Button className="!px-6 !py-6 mr-4 font-[700]  text-[15px] leading-[19px]">+ Add New Task</Button>
					<MoreVertical className="text-muted size-7 hover:cursor-pointer" />
				</div>
			</div>
		</header>
	);
}
