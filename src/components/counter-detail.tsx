"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CandleStickIcon from "./icons/candle-stick-icon";
import Image from "next/image";
// import FractionalNFTDisplay from './fractional-nft-display';

import useVault from "@/hooks/use_vault";
import { DisplayNFTs } from "./nft-display";

import { images } from "@/lib/constants/images";
import { propertyNames } from "@/lib/constants/property_names";
import { shortAddress } from "@/lib/utils";


const CounterDetail = () => {
	const searchParams = useSearchParams();
	const contract = searchParams.get("contract");
	const idString = searchParams.get("id");
	const id = Number(idString);

	const {
		currentController,
		hasControl,
		writeAsync,
		doorOpen,
		propertyAddress,
		depositedContractAddress,
		isPending,
		transactionLoading
	} = useVault(contract);

	return (
		<Card className="flex flex-col w-full mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
			<div className="w-full flex justify-between space-x-2.5">
				<div>
					<h1 className="text-lg sm:text-2xl font-semibold">
						{propertyNames[id]}
					</h1>
					<h2 className="font-semibold mt-2">
						<a
							href={`https://goerli.voyager.online/contract/${contract}`}
							className="text-gray hover:text-blue-800 visited:text-gray"
							target="_blank"
							rel="noopener noreferrer"
						>
							{contract ? shortAddress(contract) : "N/A"}
						</a>
					</h2>
				</div>
				<Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
					<CandleStickIcon />
				</Button>
			</div>
			<CardContent className="flex w-full p-0 md:space-x-6 flex-col space-y-6 md:flex-row md:space-y-0">
				<div className="flex-1 space-y-6 h-full">
					<div className="h-fit p-10 border-2 border-slate-800 rounded-lg">
						<div className="w-full h-full flex flex-col items-center justify-center space-y-6">
							<div className="relative max-w-[300px] max-h-[200px] rounded-lg overflow-hidden">
								<Image
									src={`/${images[id]}`}
									alt="property image"
									width={300}
									height={200}
								/>
							</div>
							<div className="border-2 border-slate-800 rounded-lg w-72 p-3.5 text-center">
								<p>{doorOpen ? "Door Opened" : "Door Closed"}</p>
							</div>
							<div className="flex space-x-5 items-center w-72 justify-between">
								<Button
									className={`bg-transparent ${
										hasControl
											? "hover:bg-[#16A24A] focus:bg-[#16A24A] border-[#16A24A]"
											: "hover:bg-[#EF4444] focus:bg-[#EF4444] border-[#EF4444]"
									} flex-1 border-2 text-base`}
									onClick={() => writeAsync()}
									disabled={!hasControl}
								>
									{!isPending || !transactionLoading ? doorOpen ? "Close Door" : "Open Door" : "loading"}
								</Button>
							</div>
							<div>
								<p className="text-base font-normal">
									Current Controller {shortAddress(currentController)}
								</p>
							</div>
						</div>
					</div>
					<div className="h-fit border-2 border-slate-800 rounded-lg text-center p-5">
						{hasControl ? (
							<p className="text-slate-300 text-lg">You have control!</p>
						) : (
							<p className="text-slate-300 text-lg">
								You currently don{"’"}t have permission to call Deadalus
								property contract.
							</p>
						)}
					</div>
				</div>
				<DisplayNFTs propertyAddress={depositedContractAddress} />
			</CardContent>
		</Card>
	);
};

export default CounterDetail;
