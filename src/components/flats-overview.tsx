"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CandleStickIcon from "./icons/candle-stick-icon";
import Link from "next/link";
import {
  RpcProvider,
  Contract,
  num,
  hash,
} from "starknet";
import { Card, } from "@/components/ui/card";
import { VAULT_ADDRESS } from "@/lib/constants/contract_address";
import Image from "next/image";
import { SwishSpinner } from "react-spinners-kit";

import { shortAddress } from "@/lib/utils";

import { images } from "@/lib/constants/images";
import { propertyNames } from "@/lib/constants/property_names";


export const DisplayFlats = () => {

  const [abi, setAbi] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [events, setEvents] = useState<any>({ events: [] });


  const providerGoerli = new RpcProvider({
    nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0_6",
  });


  const getEvents = async () => {
    const lastBlock = await providerGoerli.getBlockLatestAccepted();
    const keyFilter = [
      num.toHex(hash.starknetKeccak("ContractDeposit")),
      "0x8",
    ];
    const eventsList = await providerGoerli.getEvents({
      address: VAULT_ADDRESS,
      from_block: { block_number: lastBlock.block_number - 900 },
      to_block: "pending",
      keys: [keyFilter],
      chunk_size: 10,
    });
    setEvents(eventsList);
  };

  // Load ABI on component mount
  useEffect(() => {
    const getAbi = async () => {
      const { abi: contractAbi } = await providerGoerli.getClassAt(
        VAULT_ADDRESS
      );
      setAbi(contractAbi);
    };

    getAbi();
  }, []); // Empty dependency array means this effect runs once on mount

  // Set contract after ABI is loaded
  useEffect(() => {
    if (abi) {
      const newContract = new Contract(abi, VAULT_ADDRESS, providerGoerli);
      setContract(newContract);
    }
  }, [abi]); // This effect runs when `abi` changes

  useEffect(() => {
    if (contract) {
      getEvents();
    }
  }, [contract]);


  return (
    <Card className="flex flex-col w-full mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Deadalus Vault
        </h1>
        <Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
          <CandleStickIcon />
        </Button>
      </div>
      {
        events.events.length > 0 ?
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:min-w-[700px] lg:min-h-[900px]">
            {
              events.events.map((flat: any, index: number) => (
                <div
                  key={index}
                  className="card max-w-[375px] bg-base-100 shadow-xl border-2 border-[#D9D9D9]/30 rounded-2xl overflow-hidden"
                >
                  <figure className="relative w-[375xpx] h-[200px] overflow-hidden rounded-t-2xl">
                    <Image
                      src={`/${images[index]}`}
                      alt="property image"
                      layout="fill"
                      objectFit="cover"

                    />
                  </figure>
                  <div className="card-body px-3.5">
                    <h2 className="card-title py-3">{propertyNames[index]}</h2>
                    <p>{shortAddress(flat.data[0])}</p>
                    <div className="card-actions justify-end py-3">
                      <Link href={`/counters/fractionalized?contract=${flat.data[0]}&id=${index}`}>
                        <Button className="btn btn-primary rounded-lg px-6 bg-green-600 hover:bg-green-600 focus:bg-green-600">
                          Enter
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
              )
            }
          </div>
          :
          <div className="flex justify-center items-center bg-gray-800 w-full min-w-[700px] min-h-[900px]">
            <SwishSpinner size={100} color="#ffffff" />
          </div>
      }
    </Card>
  );
};


