"use client"

import { useState } from 'react'
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CandleStickIcon from './icons/candle-stick-icon';
import FractionalizeIcon from './icons/fractionalize-icon';
import clsx from 'clsx';

const CounterFractionalizer = () => {
	const [frequency, setFrequency] = useState('daily');

	const handleFrequencyChange = (frequency: string) => setFrequency(frequency);
	return (
		<Card className="flex flex-col lg:w-1/2 mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
			<div className='w-full flex items-center justify-between'>
				<h1 className="text-2xl font-semibold">Fractionalize Counter</h1>
				<Button className='bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]'>
					<CandleStickIcon />
				</Button>
			</div>
			<CardHeader className="flex flex-col items-center justify-center space-y-5 border-2 border-slate-800 rounded-lg">
				<p className="flex justify-center items-center w-full text-lg sm:text-xl text-white text-center">
					Select counter access token frequency
				</p>
				<div className='flex justify-center space-x-2 sm:space-x-5'>
					<Button
						onClick={() => handleFrequencyChange('daily')}
						className={clsx('text-base text-white px-5 border-2 border-[#16A24A]', frequency === 'daily' &&
							'bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]')}
					>
						Daily
					</Button>
					<Button
						onClick={() => handleFrequencyChange('weekly')}
						className={clsx('text-base text-white px-5 border-2 border-[#16A24A]', frequency === 'weekly' &&
							'bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]')}
					>
						Weekly
					</Button>
					<Button
						onClick={() => handleFrequencyChange('monthly')}
						className={clsx('text-base text-white px-5 border-2 border-[#16A24A]', frequency === 'monthly' &&
							'bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]')}
					>
						Monthly
					</Button>
				</div>
			</CardHeader>
			<CardContent className="flex justify-center border-2 border-slate-800 rounded-lg pt-6 text-slate-300 text-lg sm:text-xl">
				You are creating <span className="font-bold ml-1 text-white">{frequency === 'daily' ? "365" : frequency === 'weekly' ?
					"52" : "12"} tokens</span>
			</CardContent>
			<Button className="bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A] flex justify-center items-center h-14">
				<div className='flex flex-row justify-center items-center space-x-0.5'>
					<FractionalizeIcon />
					<p className='mt-0.5 text-lg sm:text-xl font-normal'>Fractionalize</p>
				</div>
			</Button>
		</Card>
	);
}

export default CounterFractionalizer;