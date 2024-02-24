"use client";

import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import ConnectWallet from "@/components/layout/connect";
import dynamic from "next/dynamic";
import { useAccount } from "@starknet-react/core";

const ConnectModal = dynamic(() => import("./layout/connect-modal"), {
	ssr: false,
});

const CounterConnect = () => {
	const { address } = useAccount();
	return (
		<Card className="flex flex-col lg:w-1/2 mx-auto bg-[#111827] p-5 gap-y-4">
			<CardHeader className="flex justify-center border border-slate-300 rounded-lg">
				<div className="flex justify-center items-center w-full">
					<ConnectWallet />
				</div>
			</CardHeader>
			<CardFooter className="flex justify-between border border-slate-300 rounded-lg pt-6 text-white">
				<p>Learn more about how to fractionalize assets</p>
				<ExternalLink />
			</CardFooter>
		</Card>
	);
};

export default CounterConnect;
