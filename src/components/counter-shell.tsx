"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card" 
import { ExternalLink } from 'lucide-react'
import ConnectWallet from "@/components/layout/connect";
import dynamic from "next/dynamic";
import { useAccount } from "@starknet-react/core";

const ConnectModal = dynamic(() => import("./layout/connect-modal"), { ssr: false });

const CounterConnect = () => {
  const { address } = useAccount();
  return (
		<Card className="flex flex-col w-2/3 mx-auto p-5 gap-y-4">
			<CardHeader className="flex justify-center border-2">
				<ConnectWallet />
			</CardHeader>
			<CardFooter className="border-2">
				<p>Learn more about how to fractionalize assets</p>
				<ExternalLink />
			</CardFooter>
		</Card>
	);
}

export default CounterConnect