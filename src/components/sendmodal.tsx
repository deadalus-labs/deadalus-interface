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
import { Input } from "./ui/input";

type SendModalProps = {
  id: number;
  NFTContract: any; // Consider defining a more specific type
  provider: any; // Consider defining a more specific type
};

export const SendModal: React.FC<SendModalProps> = ({
  id,
  NFTContract,
  provider,
}) => {
  const { account } = useAccount();
  const [receiver, setReceiver] = useState<string>("");

  const transferNFT = async (owner: string, receiver: string, id: number) => {
    const myCall = NFTContract.populate("transfer_from", [owner, receiver, id]);
    NFTContract.connect(account);
    const res = await NFTContract.transfer_from(myCall.calldata);
    await provider.waitForTransaction(res.transaction_hash);
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Send Fraction to: </h3>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex flex-col items-center justify-center space-y-1 w-2/3">
                <input
                  type="text"
                  value={receiver}
                  onChange={(event) =>
                    setReceiver(event.target.value as string)
                  }
                  placeholder="Enter receiver address"
                  className="w-full bg-transparent px-5 py-7 border-slate-800 focus-visible:ring-offset-0 focus-visible:ring-0"
                />
              </div>
              <Button
                className="bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A] flex justify-center items-center h-14 w-full"
                onClick={() => {
                  if (account) transferNFT(account.address, receiver, id);
                }}
              >
                <div className="flex flex-row justify-center items-center space-x-0.5">
                  <p className="mt-0.5 text-lg sm:text-xl font-normal">
                    Send Fraction
                  </p>
                </div>
              </Button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
