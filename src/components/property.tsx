"use client";

import { useAccount } from "@starknet-react/core";
import React, { useEffect, useState } from "react";
import { shortString, cairo } from "starknet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CandleStickIcon from "./icons/candle-stick-icon";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import Image from "next/image";
import { Account, RpcProvider, Contract } from "starknet";
import { useContractRead } from "@starknet-react/core";

const contractAddress =
  "0x049ac2b4cf4b9db9f9c222db84ec1d5ebc1408175ac9c20d1e45ca0046ecd56a";

const PropertyDetail = (propertyAddressPassed: string) => {
  const [abi, setAbi] = useState<any>();
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState<any>();
  const [propertyAddress, setPropertyAddress] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const { account } = useAccount();

  const openFunction = () => {
    setOpen(true);
  };

  const providerGoerli = new RpcProvider({
    nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0_6",
  });

  const getAbi = async (provider: any, contractAddress: string) => {
    const { abi: contractAbi } = await provider.getClassAt(contractAddress);
    setAbi(contractAbi);
    console.log("ABI", contractAbi);
  };

  const getOwner = async () => {
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

  const toggleDoor = async () => {
    // const myCall = contract.populate("toggle_door", ["0xasdsda"]);
    contract.connect(account);
    const res = await contract.toogle_door();
    await providerGoerli.waitForTransaction(res.transaction_hash);
  };

  // Load ABI on component mount
  useEffect(() => {
    const getAbi = async () => {
      const { abi: contractAbi } = await providerGoerli.getClassAt(
        contractAddress
      );
      setAbi(contractAbi);
    };

    getAbi();
  }, []); // Empty dependency array means this effect runs once on mount

  // Set contract after ABI is loaded
  useEffect(() => {
    if (abi) {
      const newContract = new Contract(abi, contractAddress, providerGoerli);
      setContract(newContract);
    }
  }, [abi]); // This effect runs when `abi` changes

  // Get owner after contract is set
  useEffect(() => {
    getOwner();
  }, [contract]);

  const closeFunction = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  const counters = ["Counter 1", "Counter 2", "Counter 3", "Counter 4"];
  return (
    <Card className="flex flex-col w-full mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Property 1</h1>
        <Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
          <CandleStickIcon />
        </Button>
      </div>
      <p>Property Address: {propertyAddressPassed}</p>
      <button
        className="btn"
        onClick={() => {
          //   getAbi(providerGoerli, contractAddress);
          console.log("Address", account?.address);
          console.log("Provider", providerGoerli);
          console.log("ABI", abi);
          console.log("contract", contract);
        }}
      >
        Click me
      </button>
      <button
        className="btn"
        onClick={() => {
          //   getAbi(providerGoerli, contractAddress);
          getAbi(providerGoerli, contractAddress);
        }}
      >
        1. Get Abi
      </button>
      <button
        className="btn"
        onClick={() => {
          //   getAbi(providerGoerli, contractAddress);
          getContract(abi, contractAddress, providerGoerli);
        }}
      >
        2. Get Contract
      </button>
      <button
        className="btn"
        onClick={() => {
          //   getAbi(providerGoerli, contractAddress);
          getOwner();
        }}
      >
        3. Get Owner
      </button>
      <button
        className="btn"
        onClick={() => {
          //   getAbi(providerGoerli, contractAddress);
          toggleDoor();
        }}
      >
        4. Toggle Door
      </button>

      <h2 className="text-1xl font-semibold">
        Property address: {contractAddress}
      </h2>
      <h2 className="text-1xl font-semibold">Owner address: {ownerAddress}</h2>
      <CardContent className="flex w-full p-0 md:space-x-6 flex-col space-y-6 md:flex-row md:space-y-0">
        <div className="flex-1 space-y-6 h-full">
          <div className="h-fit py-10 border-2 border-slate-800 rounded-lg">
            <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
              <div className="relative max-w-[300px] max-h-[200px] rounded-lg">
                <Image
                  src="/property.png"
                  alt="property image"
                  width={300}
                  height={200}
                />
              </div>
              <div className="border-2 border-slate-800 rounded-lg w-72 p-3.5 text-center">
                <p>{open ? "Door Opened" : "Door Closed"}</p>
              </div>
              <div className="flex space-x-5 items-center w-72 justify-between">
                <Button
                  className="bg-transparent hover:bg-[#16A24A] focus:bg-[#16A24A] flex-1 border-2 border-[#16A24A] text-base"
                  onClick={openFunction}
                >
                  Open Door
                </Button>
                <Button
                  className="bg-transparent hover:bg-[#16A24A] focus:bg-[#16A24A] flex-1 border-2 border-[#16A24A] text-base"
                  onClick={closeFunction}
                >
                  Close Door
                </Button>
              </div>
              <div>
                <p className="text-base sm:text-2xl font-normal">
                  Apartment Location
                </p>
              </div>
            </div>
          </div>
          <div className="h-fit border-2 border-slate-800 rounded-lg text-center p-5">
            <p className="text-slate-300 text-lg">
              You currently don{"’"}t have permission to call Deadalus property
              contract.
            </p>
          </div>
        </div>
        <div className="flex-1 h-fit border-2 border-slate-800 rounded-lg">
          <Tabs defaultValue="history">
            <TabsList className="bg-transparent border-b-2 border-slate-800 w-full flex justify-start rounded-b-none">
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-transparent data-[state=active]:text-slate-400 
							data-[state=active]:underline data-[state=active]:underline-offset-[13.5px] data-[state=active]:decoration-[#16A24A] 
							font-medium text-base"
              >
                Access History
              </TabsTrigger>
              <TabsTrigger
                value="transaction"
                className="data-[state=active]:bg-transparent data-[state=active]:text-slate-400 
							data-[state=active]:underline data-[state=active]:underline-offset-[13.5px] data-[state=active]:decoration-[#16A24A] 
							font-medium text-base"
              >
                Counter Transaction
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="hover:bg-transparent flex border-transparent justify-between items-center">
                    <TableHead className="text-slate-400 text-lg flex items-center font-normal">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-slate-400 text-lg flex items-center font-normal">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counters.map((counter, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-transparent border-slate-800 border-t-2
									flex justify-between items-center"
                    >
                      <TableCell className="text-base font-normal text-slate-50">
                        {counter}
                      </TableCell>
                      <TableCell className="text-base font-normal text-slate-50">
                        {counter}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="transaction">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="hover:bg-transparent flex border-transparent justify-between items-center">
                    <TableHead className="text-slate-400 text-lg flex items-center font-normal">
                      Timestamp
                    </TableHead>
                    <TableHead className="text-slate-400 text-lg flex items-center font-normal">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {counters.map((counter, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-transparent border-slate-800 border-2 flex justify-between items-center"
                    >
                      <TableCell className="text-base font-normal text-slate-50">
                        {counter}
                      </TableCell>
                      <TableCell className="text-base font-normal text-slate-50">
                        {counter}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetail;
