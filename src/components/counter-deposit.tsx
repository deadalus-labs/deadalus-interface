import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const CounterDeposit = () => {
  return (
		<Card className="flex flex-col lg:w-1/2 mx-auto bg-[#111827] p-5 gap-y-4 text-white">
			<CardHeader className="flex justify-center border border-slate-300 rounded-lg">
				<div className="flex justify-center items-center w-full">
					<Button className="bg-green-500 px-10">Deposit</Button>
				</div>
			</CardHeader>
			<CardContent className="border rounded-lg">
				<div className='flex mt-2'>
					<h2>Your Counters</h2>
					<Badge className='bg-green-400 px-3 ml-2'>4</Badge>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between border border-slate-300 rounded-lg pt-6 text-white">
				<p>Learn more about how to fractionalize assets</p>
				<ExternalLink />
			</CardFooter>
		</Card>
	);
}

export default CounterDeposit;