import React from "react";
import { Switch } from "@headlessui/react";

export default function Switch2({
	checked,
	onCheckedChange,
}: {
	checked: boolean;
	onCheckedChange: () => void;
}) {
	return (
		<Switch
			checked={checked}
			onChange={onCheckedChange}
			className="group inline-flex h-[22px] w-11 items-center rounded-full bg-[#a8a4ff] data-disabled:cursor-not-allowed data-disabled:opacity-50"
		>
			<span className="size-4 translate-x-1 rounded-full bg-white transition duration-[400ms] group-data-checked:translate-x-6" />
		</Switch>
	);
}
