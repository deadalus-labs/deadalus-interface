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

const exampleProperty =
  "0x0237a3789dc57c95c957e5b9206cb3a4cf07c0989368835d7446697d83da66c6";

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
  const [id, setId] = useState<number>();

  return (
    <>
      <p> VaultContractAddress: {VAULT_ADDRESS}</p>
      <button
        onClick={() => {
          console.log(owners);
        }}
      >
        {" "}
        NFT ABI
      </button>
      <div className="max-h-[calc(100vh-4rem)] overflow-auto">
        <div className="grid grid-cols-3 gap-4">
          {owners &&
            owners.map((owner: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedNFT(index + 1)}
                className={clsx(
                  "card w-96 bg-base-100 shadow-xl",
                  { "bg-green-500": account?.address === owner } // Replace 'bg-green-500' with your desired green background class
                )}
              >
                <figure className="relative max-w-[200px] max-h-[200px] rounded-lg">
                  <Image
                    src="/bg-deadalus-logo.png"
                    alt="property image"
                    width={200}
                    height={200}
                    layout="responsive"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title"> {index + 1}. half of minute</h2>
                  <p>{shortAddress(owner)}</p>
                  <div className="card-actions justify-end">
                    {account?.address === owner && (
                      <button
                        className="btn"
                        onClick={() => {
                          const modal = document.getElementById("my_modal_1");
                          setId(index + 1);
                          if (modal instanceof HTMLDialogElement) {
                            modal.showModal();
                          } else {
                            console.error("Element is not a dialog");
                          }
                        }}
                      >
                        Send
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {id && (
        <SendModal provider={provider} id={id} NFTContract={NFTContract} />
      )}
    </>
  );
};
