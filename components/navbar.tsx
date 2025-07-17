"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { MoreVertical, PlusIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

export default function Navbar() {
	const { open } = useSidebar();
	return (
		<header className="w-full border-b h-[65px] md:h-[80px] bg-white dark:bg-sidebar flex !items-center !justify-between !px-4 lg:!px-5 sticky top-0">
			{!open && (
				<div className="flex flex-row !flex-start items-center gap-[15px] mr-[106px]">
					<Image
						width={25}
						height={25}
						src={"/kanban-logo.svg"}
						alt="kanban logo"
					/>
					<h1 className="text-black text-[21px] md:text-[32px] font-[700] dark:text-white">
						Kanban
					</h1>
				</div>
			)}

			<div className="justify-between flex items-center md:flex-1">
				<h1 className="hidden md:block text-black dark:text-white font-[700] text-[1.315rem]">
					Board NAME
				</h1>
				<div className="flex items-center">
					<Button
						variant={"default"}
						className="flex md:hidden !px-4 mr-4 font-[700] text-[15px] leading-[19px] rounded-[24px] h-[30px] justify-center items-center"
					>
						<PlusIcon strokeWidth={4} />
					</Button>

					<Button
						variant={"default"}
						className="hidden md:flex !px-6 !py-6 mr-4 font-[700] text-[15px] leading-[19px]"
					>
						+ Add New Task
					</Button>

					<MoreVertical className="text-muted size-7 hover:cursor-pointer" />
				</div>
			</div>
		</header>
	);
}
