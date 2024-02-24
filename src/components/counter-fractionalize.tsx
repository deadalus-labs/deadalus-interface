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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CakeSlice } from 'lucide-react';

const CounterFractionalizer = () => {
  return (
		<Card className="flex flex-col lg:w-1/2 mx-auto text-white bg-[#111827] p-5 gap-y-4">
			<CardHeader className="flex justify-center border border-slate-300 rounded-lg">
				<div className="flex justify-center items-center w-full">
					Select counter access token frequency
				</div>
				<RadioGroup defaultValue="daily" className='flex justify-center'>
					<div className="flex items-center space-x-2">
						<Button
							value="daily"
							id="r1"
						>
							Daily
						</Button>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							value="weekly"
							id="r2"
						>
							Weekly
						</Button>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							value="monthly"
							id="r3"
						>
							Monthly
						</Button>
					</div>
				</RadioGroup>
			</CardHeader>
			<CardContent className="flex justify-center border border-slate-300 rounded-lg pt-6 text-white">
				You are creating <span className="font-bold ml-1">365 tokens</span>
			</CardContent>
			<Button className="bg-green-400">
				<CakeSlice className="mr-2" />
				Fractionalize
			</Button>
		</Card>
	);
}

export default CounterFractionalizer;