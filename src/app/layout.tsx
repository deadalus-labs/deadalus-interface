import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { StarknetProvider } from "@/context/starknet-provider";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Deadalus Interface",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={cn("h-full bg-slate-800", inter.className)}>
				<StarknetProvider>
					<Header>{children}</Header>
				</StarknetProvider>
			</body>
		</html>
	);
}
