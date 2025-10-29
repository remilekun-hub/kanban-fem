import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import { Suspense } from "react";
import BoardLists from "./board/_components/boardlists";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import BoardListsSkeleton from "./board/_components/boardlistsSkeleton";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	if (!session?.user) {
		redirect("/sign-in");
	}
	return (
		<SessionProvider>
			<SidebarProvider>
				<AppSidebar>
					<Suspense fallback={<BoardListsSkeleton />}>
						<BoardLists />
					</Suspense>
				</AppSidebar>
				<div className="w-full overflow-hidden min-h-full h-svh">
					<Navbar />
					{children}
				</div>
			</SidebarProvider>
		</SessionProvider>
	);
}
