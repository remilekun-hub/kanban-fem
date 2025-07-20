import React from "react";
import { Button } from "./ui/button";
import BoardIcon from "@/app/icons/board-icon";
import { BoardLinkType } from "@/app/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Boardlink({ boardName, id, isActive }: BoardLinkType) {
	return (
		<Button
			asChild
			variant={"default"}
			className="!pl-6 mr-6 !py-6 font-[700] text-[15px] leading-[19px] rounded-l-none justify-start w-full max-w-[235px]"
		>
			<Link href={`/board/${id}`}>
				<BoardIcon className="mr-2" /> {boardName}
			</Link>
		</Button>
	);
}
