import React from "react";
import Task from "./task";

export default function Project() {
	return (
		<div className="w-[280px]">
			<div className="mb-4">
				<h2 className="text-muted mb uppercase text-[12px] font-[700] tracking-[2px]">TODO (0)</h2>
			</div>
			<div className="flex flex-col gap-4">
				<Task />
			</div>
		</div>
	);
}
