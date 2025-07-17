import React from "react";
import Project from "./project";
import AddColumn from "./add-column";

export default function Board() {
	return (
		<div className="w-full h-full flex gap-6 px-4 lg:px-5 pt-4 py-6 overflow-x-scroll scrollbar-hide">
			<Project />
			<AddColumn />
		</div>
	);
}
