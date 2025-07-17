import { AppSidebar } from "@/components/app-sidebar";
// import Main from "@/components/main";
import Navbar from "@/components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@fontsource/plus-jakarta-sans/200.css";
import "@fontsource/plus-jakarta-sans/300.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="w-full">
				<Navbar />
				
				{children}
			</div>
		</SidebarProvider>
	);
}
