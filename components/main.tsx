// "use client";
// import React, { useEffect } from "react";
// import Navbar from "./navbar";
// import { AppSidebar } from "./app-sidebar";
// import { useSidebar } from "./ui/sidebar";
// import { SIDEBAR_WIDTH } from "./ui/sidebar";

// export default function Main({ children }: { children: React.ReactNode }) {
// 	const { open, isMobile, setOpen } = useSidebar();

// 	const width = SIDEBAR_WIDTH;

// 	useEffect(() => {
// 		if (isMobile) {
// 			setOpen(false);
// 		}
	
// 	}, [isMobile, open]);

// 	return (
// 		<div className="w-full">
// 			<Navbar />
// 			<AppSidebar />
// 			<div
// 				className="!px-6 !py-4 h-auto min-h-auto"
// 				style={{
// 					marginLeft: open ? width : "0",
// 					transition: "margin-left 0.3s ease",
// 				}}
// 			>
// 				{children}
// 			</div>
// 		</div>
// 	);
// }
