"use client";

import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import CandleStickIcon from "./icons/candle-stick-icon";
import {
  Account,
  RpcProvider,
  Contract,
  CallData,
  num,
  hash,
  shortString,
} from "starknet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import clsx from "clsx";
import {
  VAULT_ADDRESS,
  TOOGLE_SELECTOR,
} from "@/lib/constants/contract_address";
import FractionalizeIcon from "./icons/fractionalize-icon";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Fractionalize = () => {
  const [frequency, setFrequency] = useState("daily");
  const [abi, setAbi] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [propertyAddress, setPropertyAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const { account } = useAccount();
  const [events, setEvents] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [enableLinkProperty, setEnableLinkProperty] = useState(false);

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
      // state true
      setLoading(true);
      const multiCall = await account.execute([
        // 1. transfer property
        {
          contractAddress: propertyAddress,
          entrypoint: "transfer_ownership",
          calldata: CallData.compile({
            contractAddress: VAULT_ADDRESS, // transfer ownership to VAULT
          }),
        },
        // 2. mint nfts
        {
          contractAddress: VAULT_ADDRESS,
          entrypoint: "deposit_contract",
          calldata: CallData.compile({
            contractAddress: propertyAddress,
          }),
        },
        // 3. add functions
        {
          contractAddress: VAULT_ADDRESS,
          entrypoint: "add_function",
          calldata: CallData.compile({
            function_selector: TOOGLE_SELECTOR,
            require_owner: true,
          }),
        },
      ]);
      const receipt = await providerGoerli.waitForTransaction(
        multiCall.transaction_hash
      );
      setLoading(false);
      setEnableLinkProperty(true);
      console.log(receipt);
    }
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
    console.log(eventsList);
    return eventsList;
  };

  const shortAddress = (address: string) => {
    let displayAddress = address?.slice(0, 5) + "..." + address?.slice(-4);
    return displayAddress;
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

  return (
    <>
      <Card className="flex flex-col w-full md:w-[80%] sm:mx-auto text-white bg-[#111827A6]/65 py-5 px-5 sm:px-10 space-y-10 border-0">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Fractionalize your real estate
          </h1>
          <Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
            <CandleStickIcon />
          </Button>
        </div>
        <CardHeader className="flex flex-col items-center justify-center space-y-5 border-2 border-slate-800 rounded-lg">
          <h2 className="text-1xl font-semibold">
            Enter your real estate address:{" "}
          </h2>
          <div className="flex flex-col items-center justify-center w-full space-y-8">
            <div className="flex flex-col items-center justify-center space-y-1 w-[55%]">
              <Input
                type="text"
                value={propertyAddress}
                onChange={(event) =>
                  setPropertyAddress(event.target.value as string)
                }
                placeholder="Deposit Cairo Contract"
                className="w-full bg-transparent px-5 py-7 border-slate-800 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
            </div>
          </div>
          <p className="flex justify-center items-center w-full text-lg sm:text-xl text-white text-center">
            Select counter access token frequency
          </p>
          <div className="flex space-x-2 justify-center sm:space-x-5">
            <Button
              onClick={() => handleFrequencyChange("daily")}
              className={clsx(
                "text-base text-white px-5 sm:px-10 border-2 border-[#16A24A]",
                frequency === "daily" &&
                  "bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]"
              )}
            >
              Minutely
            </Button>
            <Button
              onClick={() => handleFrequencyChange("weekly")}
              className={clsx(
                "text-base text-white px-5 sm:px-10 border-2 border-[#16A24A]",
                frequency === "weekly" &&
                  "bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]"
              )}
            >
              Weekly
            </Button>
            <Button
              onClick={() => handleFrequencyChange("monthly")}
              className={clsx(
                "text-base text-white px-5 sm:px-10 border-2 border-[#16A24A]",
                frequency === "monthly" &&
                  "bg-[#16A24A] hover:bg-[#16A24A] focus:bg-[#16A24A]"
              )}
            >
              Monthly
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center border-2 border-slate-800 rounded-lg pt-6 text-slate-300 text-lg sm:text-xl">
          You are creating{" "}
          <span className="font-bold ml-1 text-white">
            {frequency === "daily"
              ? "2 tokens"
              : frequency === "weekly"
              ? "7 tokens"
              : "12 tokens"}
          </span>
          {frequency === "daily"
            ? ", the first for first of the minute and the other one for the second half"
            : frequency === "weekly"
            ? ", one for each day of the week"
            : ", one for each month"}
        </CardContent>
        <div className="flex">
          <Button
            className="bg-[#16A24A] hover:bg-[#16A24A] w-2/3 focus:bg-[#16A24A] flex justify-center items-center h-14 w-full"
            onClick={() => depositContract(propertyAddress)}
            disabled={loading}
          >
            <div className="flex flex-row justify-center items-center space-x-0.5">
              <FractionalizeIcon />
              <p className="mt-0.5 text-lg sm:text-xl font-normal">Deposit</p>
            </div>
          </Button>
          <div>
            {/* <p>status: {isPending && <div>Submitting...</div>}</p>
          <p>hash: {data?.transaction_hash}</p> */}
          </div>
        </div>
        {/* <button className="btn btn-primary">
          Go the fractionalized contract - disable when contract is not deployed
          yet
        </button> */}

        {enableLinkProperty && (
          <Link href={`/counters/fractionalized?contract=${propertyAddress}`}>
            <Button className="btn btn-primary rounded-lg px-6 text-white bg-green-600 hover:bg-green-600 focus:bg-green-600">
              Go to property
            </Button>
          </Link>
        )}
      </Card>
    </>
  );
};

export default Fractionalize;
