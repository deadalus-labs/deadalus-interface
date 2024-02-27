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

export const DisplayFlats = () => {
  const [frequency, setFrequency] = useState("daily");
  const [abi, setAbi] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [propertyAddress, setPropertyAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const { account } = useAccount();
  const [events, setEvents] = useState<any>();

  const handleFrequencyChange = (frequency: string) => setFrequency(frequency);

  const providerGoerli = new RpcProvider({
    nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0_6",
  });

  const getAbi = async (provider: any, contractAddress: string) => {
    const { abi: contractAbi } = await provider.getClassAt(contractAddress);
    setAbi(contractAbi);
    console.log("ABI", contractAbi);
  };

  const getOwner = async (propertyContract: any) => {
    const owner = await contract.owner();
    setOwnerAddress(`0x${owner.toString(16)}`);
  };

  const getContract = async (
    abi: any,
    contractAddress: string,
    provider: any
  ) => {
    const contract = new Contract(abi, contractAddress, provider);
    console.log(contract);
    setContract(contract);
  };

  const callFunction = async () => {
    const myCall = contract.populate("call_function", [
      "0x04db71d3e903c931c9a5f7dfe10f7340277dfde6ff2a21995186a7f1207edc5b",
      "toogle_door",
      "",
    ]);
    contract.connect(account);
    const res = await contract.call_function(myCall.calldata);
    await providerGoerli.waitForTransaction(res.transaction_hash);
  };

  const shortAddress = (address: string) => {
    let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);
    return displayAddress;
  };

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
          Fractionalize your real estate with Starknet
        </h1>
        <Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
          <CandleStickIcon />
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events &&
          events.events.map((flat: any, index: number) => (
            <div
              key={index}
              className="card max-w-[400px] bg-base-100 shadow-xl border-2 border-[#D9D9D9]/30 rounded-2xl"
            >
              <figure className="relative max-w-[400px] max-h-[200px] rounded-t-2xl">
                <Image
                  src="/property-1.png"
                  alt="property image"
                  width={400}
                  height={200}
                  layout="responsive"
                />
              </figure>
              <div className="card-body px-3.5">
                <h2 className="card-title py-3">North Strathfield Concord West</h2>
                <p>{shortAddress(flat.data[0])}</p>
                <div className="card-actions justify-end py-3">
                  <Link href="/counters/fractionalized">
                    <Button className="btn btn-primary rounded-lg px-6 bg-green-600 hover:bg-green-600 focus:bg-green-600">
                      Enter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
<<<<<<< HEAD
      -------for debugging -------
      <p> VaultContractAddress: {shortAddress(VAULT_ADDRESS)}</p>
=======
      {/* -------for debugging -------
      <p> VaultContractAddress: {VAULT_ADDRESS}</p> */}
>>>>>>> origin/develop_philip
    </Card>
  );
};
