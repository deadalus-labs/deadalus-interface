"use client";

import { useConnect, Connector } from "@starknet-react/core";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FractionalizeIcon from "../icons/fractionalize-icon";

export default function ConnectModal() {
	const { connect, connectors } = useConnect();
	return (
		<div className="">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A] flex justify-center items-center h-14 w-[300px]">
						<div className='flex flex-row justify-center items-center space-x-0.5'>
							<FractionalizeIcon />
							<p className='mt-0.5 text-lg sm:text-xl font-normal'>Connect Wallet</p>
						</div>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>Connect Wallet</DialogHeader>
					<div className="flex flex-col gap-4">
						{connectors.map((connector: Connector) => (
							<Button
								key={connector.id}
								onClick={() => connect({ connector })}
								disabled={!connector.available()}
							>
								<img
									src={connector.icon.dark}
									className="w-4 h-4 mr-2"
								/>
								Connect {connector.name}
							</Button>
						))}
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
