"use client";
import React, { useState } from "react";

export default function AddColumn() {
	const [open, setOpen] = useState(false);
	return (
		<div>
      {/* <div></div> */}
			<div className="cursor-pointer mt-[29px] flex h-[95%] justify-center items-center bg-foreground dark:bg-[#22232E] rounded-[6px] w-[280px]">
				<button className="text-muted font-[700] text-[24px] leading-[30px] hover:text-primary">
					+ New Column
				</button>
			</div>
		</div>
	);
}
