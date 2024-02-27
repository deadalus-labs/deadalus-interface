"use client";

import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CandleStickIcon from "./icons/candle-stick-icon";
import Link from "next/link";
import {
  Account,
  RpcProvider,
  Contract,
  CallData,
  num,
  hash,
  provider,
} from "starknet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import { VAULT_ADDRESS } from "@/lib/constants/contract_address";
import Image from "next/image";
import { shortAddress } from "@/lib/utils";
import { SendModal } from "./sendmodal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";


interface NFTCardProps {
  owners: any;
  setSelectedNFT: (nft: number) => void;
  provider: any;
  NFTContract: any;
}

export const NFTCard: React.FC<NFTCardProps> = ({
  owners,
  setSelectedNFT,
  provider,
  NFTContract,
}) => {
  const { account } = useAccount();
  const [receiver, setReceiver] = useState<string>("");

  const handleInputChange = (event: any) => {
		setReceiver(event.target.value);
	};

  const transferNFT = async (owner: string, receiver: string, id: number) => {
    try{
      const myCall = NFTContract.populate("transfer_from", [owner, receiver, id]);
      NFTContract.connect(account);
      const res = await NFTContract.transfer_from(myCall.calldata);
      await provider.waitForTransaction(res.transaction_hash);
    } catch (e){
      console.log(e)
    }
  };

  return (
    <div>
      <div className="border-b-2 border-slate-800 py-2.5 px-5">
        <p> Vault Contract Address: {shortAddress(VAULT_ADDRESS)}</p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {owners &&
            owners.map((owner: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedNFT(index + 1)}
                className={"card w-fit bg-base-100 shadow-xl"}
              >
                <figure className="relative mb-2 max-w-[200px] max-h-[200px] rounded-lg">
                  <Image
                    src="/bg-deadalus-logo.png"
                    alt="property image"
                    width={200}
                    height={200}
                    layout="responsive"
                  />
                </figure>
                <div className="card-body space-y-2">
                  <h2 className="card-title text-slate-400 capitalize text-base font-semibold"> {index + 1}. half of minute</h2>
                  <p className="text-sm">{shortAddress(owner)}</p>
                  <div className="card-actions justify-end">
                    {account?.address === owner && (
                      <Dialog>
                        <DialogTrigger className={clsx("btn px-3.5 py-0.5 border-2 border-green-500 rounded-lg", { "bg-green-500": account?.address === owner })}>Send</DialogTrigger>
                        <DialogContent>
                          <DialogHeader className="space-y-3.5">
                            <DialogTitle>Send Fraction to</DialogTitle>
                            <DialogDescription>
                              <Input 
                                className="w-full border-2 border-black rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0" 
                                placeholder="Enter receiver’s wallet"
                                onChange={handleInputChange}
                              />
                              <Button 
                                className="w-full mt-3.5 bg-green-500 text-white hover:bg-green-500 focus:bg-green-500"
                                onClick={()=>transferNFT((account ? account.address : ''), receiver, index + 1)}
                              >Send</Button>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
