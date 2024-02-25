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
import { Input } from "@/components/ui/input";
import DepositIcon from './icons/deposit-icon';
import FractionalizeIcon from './icons/fractionalize-icon';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';

const CounterDeposit = () => {
	const counters = [
		"Counter 1",
		"Counter 2",
		"Counter 3",
		"Counter 4",
	]
	return (
		<Card className="flex flex-col lg:w-1/2 mx-auto bg-[#111827A6]/65 p-5 space-y-6 text-white border-0">
			<CardHeader className="flex justify-center items-center border-2 border-slate-800 rounded-lg h-72">
				<div className='flex flex-col items-center justify-center w-full space-y-8'>
					<div className='flex flex-col items-center justify-center space-y-1'>
						<div className='text-black'>
							<Input type='text' placeholder='Deposit Contract' />
						</div>
					</div>
					<div className='w-2/3'>
						<Button className="bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A] flex justify-center items-center h-14 w-full">
							<div className='flex flex-row justify-center items-center space-x-0.5'>
								<FractionalizeIcon />
								<p className='mt-0.5 text-lg sm:text-xl font-normal'>Deposit</p>
							</div>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className='w-full p-0 border-2 rounded-lg border-slate-800'>
				<Table className='w-full'>
					<TableHeader>
						<TableRow className='hover:bg-transparent'>
							<TableHead className='text-slate-400 text-lg rounded-t-lg flex items-center font-normal'>Your Counters <Badge className='bg-[#16A24A] ml-1'>{counters.length}</Badge></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{counters.map((counter, i) => <TableRow key={i} className='hover:bg-transparent border-slate-800 border-2'>
							<TableCell className='text-base font-normal text-slate-50'>{counter}</TableCell>
						</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter className="flex flex-row items-center justify-between border-slate-800 border-2 rounded-lg pt-6 space-x-2.5">
				<p className='text-slate-300'>Learn more about how to fractionalize assets</p>
				<ExternalLink color='#EEF5FE' />
			</CardFooter>
		</Card>
	);
}

export default CounterDeposit;