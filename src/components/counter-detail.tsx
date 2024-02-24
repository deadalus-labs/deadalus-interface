import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CounterDetail = () => {
  return (
		<Card className="flex flex-col lg:w-1/2 mx-auto bg-[#111827] p-5 gap-y-4 text-white">
			<div className="grid grid-cols-2 gap-4">
				<div>
					<CardHeader className="flex justify-center border border-slate-300 rounded-lg">
						<div className="flex justify-center items-center w-full gap-x-2">
							<Button className="bg-green-500">Increment</Button>
							<Button className="bg-green-500">Decrement</Button>
						</div>
					</CardHeader>
					<CardContent className="border rounded-lg mt-4">
						<div className="flex mt-2">
							<h2>Error Message</h2>
						</div>
					</CardContent>
				</div>
				<div>
					<CardFooter className="flex justify-between border border-slate-300 rounded-lg text-white">
						<div className="flex mt-2">
							<h2>Your Counters</h2>
						</div>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
}

export default CounterDetail;