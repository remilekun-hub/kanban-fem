import React from "react";
import Boardlink from "./boardlink";

export default async function BoardLists() {
	// const delay = () => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(resolve, 5000);
	// 	});
	// };
	// await delay();
	return (
		<div>
			<h2 className="text-muted mb uppercase text-[12px] font-[700] tracking-[2px] pl-5 mt-5 mb-4">
				ALL BOARDS (0)
			</h2>

			<Boardlink boardName="htavq" id="12" isActive={false} />
		</div>
	);
}
