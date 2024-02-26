"use client";

import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CandleStickIcon from "./icons/candle-stick-icon";
import { Account, RpcProvider, Contract, CallData, num, hash } from "starknet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import { vaultContractAddress } from "@/lib/utils";

const Fractionalize = () => {
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

  const depositContract = async (propertyAddress: string) => {
    if (account) {
      const multiCall = await account.execute([
        // 1. transfer property
        {
          contractAddress: propertyAddress,
          entrypoint: "transfer_ownership",
          calldata: CallData.compile({
            contractAddress: propertyAddress,
          }),
        },
        // 2. mint nfts
        {
          contractAddress: vaultContractAddress,
          entrypoint: "deposit_contract",
          calldata: CallData.compile({
            contractAddress: propertyAddress,
          }),
        },
        // 3. add functions
        {
          contractAddress: vaultContractAddress,
          entrypoint: "add_function",
          calldata: CallData.compile({
            function_selector: "toogle_door",
            require_owner: true,
          }),
        },
      ]);
      await providerGoerli.waitForTransaction(multiCall.transaction_hash);
    }
  };

  const getEvents = async () => {
    const lastBlock = await providerGoerli.getBlockLatestAccepted();
    const keyFilter = [
      num.toHex(hash.starknetKeccak("ContractDeposit")),
      "0x8",
    ];
    const eventsList = await providerGoerli.getEvents({
      address: vaultContractAddress,
      from_block: { block_number: lastBlock.block_number - 900 },
      to_block: "pending",
      keys: [keyFilter],
      chunk_size: 10,
    });
    setEvents(eventsList);
    console.log(eventsList);
    return eventsList;
  };

  // Load ABI on component mount
  useEffect(() => {
    const getAbi = async () => {
      const { abi: contractAbi } = await providerGoerli.getClassAt(
        vaultContractAddress
      );
      setAbi(contractAbi);
    };

    getAbi();
  }, []); // Empty dependency array means this effect runs once on mount

  // Set contract after ABI is loaded
  useEffect(() => {
    if (abi) {
      const newContract = new Contract(
        abi,
        vaultContractAddress,
        providerGoerli
      );
      setContract(newContract);
    }
  }, [abi]); // This effect runs when `abi` changes
  return (
    <Card className="flex flex-col w-full mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Fractionalize your real estate
        </h1>
        <Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
          <CandleStickIcon />
        </Button>
      </div>
      <h2 className="text-1xl font-semibold">
        Enter your real estate address:{" "}
      </h2>
      <input
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs text-black"
        value={propertyAddress}
        onChange={(event) => setPropertyAddress(event.target.value as string)}
      />
      <CardHeader className="flex flex-col items-center justify-center space-y-5 border-2 border-slate-800 rounded-lg">
        <p className="flex justify-center items-center w-full text-lg sm:text-xl text-white text-center">
          Select counter access token frequency
        </p>
        <div className="flex justify-center space-x-2 sm:space-x-5">
          <Button
            onClick={() => handleFrequencyChange("daily")}
            className={clsx(
              "text-base text-white px-5 border-2 border-[#16A24A]",
              frequency === "daily" &&
                "bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]"
            )}
          >
            Daily
          </Button>
          <Button
            onClick={() => handleFrequencyChange("weekly")}
            className={clsx(
              "text-base text-white px-5 border-2 border-[#16A24A]",
              frequency === "weekly" &&
                "bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]"
            )}
          >
            Weekly
          </Button>
          <Button
            onClick={() => handleFrequencyChange("monthly")}
            className={clsx(
              "text-base text-white px-5 border-2 border-[#16A24A]",
              frequency === "monthly" &&
                "bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]"
            )}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <button
        className="btn"
        onClick={() => {
          depositContract(propertyAddress);
        }}
      >
        Deposit Contract
      </button>
      --------------
      <p> VaultContractAddress: {vaultContractAddress}</p>
      <button
        className="btn"
        onClick={() => {
          console.log("Address", account?.address);
          console.log("Provider", providerGoerli);
          console.log("ABI", abi);
          console.log("contract", contract);
          console.log("Events", events);
          console.log("propertyAddress", propertyAddress);
        }}
      >
        Click me
      </button>
      <button
        className="btn"
        onClick={() => {
          getAbi(providerGoerli, vaultContractAddress);
        }}
      >
        1. Get Abi
      </button>
      <button
        className="btn"
        onClick={() => {
          getContract(abi, vaultContractAddress, providerGoerli);
        }}
      >
        2. Get Contract
      </button>
      <input
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
        value={propertyAddress}
        onChange={(event) => setPropertyAddress(event.target.value as string)}
      />
      <button
        className="btn"
        onClick={() => {
          depositContract(propertyAddress);
        }}
      >
        3. Deposit Contract
      </button>
      <button
        className="btn"
        onClick={() => {
          callFunction();
        }}
      >
        4. Call function in vault contract of property
      </button>
      <button
        className="btn"
        onClick={() => {
          getEvents();
        }}
      >
        5. Events
      </button>
      <button
        className="btn"
        onClick={() => {
          console.log(events.events[0]);
        }}
      >
        6. Console LOg Events
      </button>
      <h2 className="text-1xl font-semibold">
        Property address: {vaultContractAddress}
      </h2>
      <h2 className="text-1xl font-semibold">Owner address: {ownerAddress}</h2>
    </Card>
  );
};

export default Fractionalize;
