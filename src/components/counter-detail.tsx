"use client"

import React, { useState } from 'react'
import {
	Card,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CandleStickIcon from './icons/candle-stick-icon';
import Image from 'next/image';
import FractionalNFTDisplay from './fractional-nft-display';

import useVault from '@/hooks/use_vault';


const CounterDetail = () => {
	const [open, setOpen] = useState(false);
	const openFunction = () => {
		setOpen(true);
		toggleDoor();
	}
	const closeFunction = () => {
		setOpen(false);
		toggleDoor();
	}

	const { currentController, toggleDoor } = useVault("0x07a6a17706eae52c01c1ab4e92bdf5f5bf70c5fac4e67f700c5b5fb287c40e9a")

	return (
		<Card className="flex flex-col w-full mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
			<div className='w-full flex items-center justify-between'>
				<h1 className="text-2xl font-semibold">Property 1</h1>
				<Button className='bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]'>
					<CandleStickIcon />
				</Button>
			</div>
			<CardContent className='flex w-full p-0 md:space-x-6 flex-col space-y-6 md:flex-row md:space-y-0'>
				<div className='flex-1 space-y-6 h-full'>
					<div className='h-fit py-10 border-2 border-slate-800 rounded-lg'>
						<div className='w-full h-full flex flex-col items-center justify-center space-y-6'>
							<div className='relative max-w-[300px] max-h-[200px] rounded-lg'>
								<Image src='/property.png' alt='property image' width={300} height={200} />
							</div>
							<div className='border-2 border-slate-800 rounded-lg w-72 p-3.5 text-center'>
								<p>{open ? "Door Opened" : "Door Closed"}</p>
							</div>
							<div className='flex space-x-5 items-center w-72 justify-between'>
								<Button className='bg-transparent hover:bg-[#16A24A] focus:bg-[#16A24A] flex-1 border-2 border-[#16A24A] text-base' onClick={openFunction}>Open Door</Button>
								<Button className='bg-transparent hover:bg-[#16A24A] focus:bg-[#16A24A] flex-1 border-2 border-[#16A24A] text-base' onClick={closeFunction}>Close Door</Button>
							</div>
							<div>
								<p className='text-base sm:text-2xl font-normal'>Apartment Location</p>
							</div>
							<div>
								<p className='text-base font-normal'>Current Controller {currentController}</p>
							</div>
						</div>
					</div>
					<div className='h-fit border-2 border-slate-800 rounded-lg text-center p-5'>
						<p className='text-slate-300 text-lg'>You currently don{"’"}t have permission to call Deadalus property contract.</p>
					</div>
				</div>
				<FractionalNFTDisplay />
			</CardContent>
		</Card>
	);
}

export default CounterDetail;