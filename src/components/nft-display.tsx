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
import { NFTCard } from "./nft-card";

export const DisplayNFTs = (propertyAddress: any) => {
  const [abi, setAbi] = useState<any>();
  const [NFTabi, setNFTabi] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [NFTcontract, setNFTcontract] = useState<any>();
  const { account } = useAccount();
  //   const [events, setEvents] = useState<any>();
  const [NFTAddress, setNFTAddress] = useState("");
  const [NFTOwners, setNFTOwners] = useState<string[]>([""]);
  const [selectedNFT, setSelectedNFT] = useState<number>();

  const providerGoerli = new RpcProvider({
    nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0_6",
  });

  const handleNFTSelect = (index: number) => {
    setSelectedNFT(index);
  };

  console.log("property address", propertyAddress.propertyAddress);

  /// Set ABIs

  // const getNFTAbi = async (provider: any, contractAddress: string) => {
  //   const { abi: contractAbi } = await providerGoerli.getClassAt(
  //     contractAddress
  //   );
  //   setNFTabi(contractAbi);
  // };

  /// Get NFT Cotract Address

  const getNFTaddress = async (propertyAddress: string) => {
    const address = await contract.get_nft_address(propertyAddress);
    setNFTAddress(`0x${address.toString(16)}`);
  };

  const getOwnerOfNFT = async (NFTcontract: any, id: Number) => {
    const owner = await NFTcontract.owner_of(id);
    console.log(`0x${owner.toString(16)}`);
    return `0x${owner.toString(16)}`;
  };

  //   const getEvents = async () => {
  //     const lastBlock = await providerGoerli.getBlockLatestAccepted();
  //     const keyFilter = [
  //       num.toHex(hash.starknetKeccak("ContractDeposit")),
  //       "0x8",
  //     ];
  //     const eventsList = await providerGoerli.getEvents({
  //       address: VAULT_ADDRESS,
  //       from_block: { block_number: lastBlock.block_number - 900 },
  //       to_block: "pending",
  //       keys: [keyFilter],
  //       chunk_size: 10,
  //     });
  //     setEvents(eventsList);
  //   };

  // Load VaultABI on component mount
  useEffect(() => {
    const getAbi = async () => {
      const { abi: contractAbi } = await providerGoerli.getClassAt(
        VAULT_ADDRESS
      );
      setAbi(contractAbi);
    };
    getAbi();
  }, []);

  // Set contract after ABI is loaded
  useEffect(() => {
    if (abi) {
      const newContract = new Contract(abi, VAULT_ADDRESS, providerGoerli);
      setContract(newContract);
    }
  }, [abi]); // This effect runs when `abi` changes

  useEffect(() => {
    if (contract) {
      getNFTaddress(propertyAddress.propertyAddress);
    }
  }, [contract]);

  useEffect(() => {
    if (NFTAddress) {
      const getAbi = async () => {
        const { abi: contractAbi } = await providerGoerli.getClassAt(
          NFTAddress
        );
        setNFTabi(contractAbi);
        console.log("nftabi", contractAbi);
      };
      getAbi();
    }
  }, [NFTAddress]);

  useEffect(() => {
    if (NFTabi) {
      const newContract = new Contract(NFTabi, NFTAddress, providerGoerli);
      setNFTcontract(newContract);
    }
  }, [NFTabi]);

  useEffect(() => {
    if (NFTcontract) {
      const getNFTOwnerArray = async (amountNFTs: number) => {
        let owners = [];
        for (let i = 1; i <= amountNFTs; i++) {
          const owner = await getOwnerOfNFT(NFTcontract, i);
          owners.push(owner);
        }
        setNFTOwners(owners);
        return owners;
      };
      getNFTOwnerArray(2);
    }
  }, [NFTcontract]);

  return (
    <>
      <Card className="flex flex-col w-full mx-auto text-white bg-[#111827A6]/65 p-5 space-y-6 border-0">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            Fractionalize your real estate with Starknet
          </h1>
          <h2 className="text-2xl font-semibold">
            Fractionalized real estates:
          </h2>
          <Button className="bg-[#16A24A] focus:bg-[#16A24A] hover:bg-[#16A24A]">
            <CandleStickIcon />
          </Button>
        </div>
        <NFTCard
          owners={NFTOwners}
          setSelectedNFT={setSelectedNFT}
          provider={providerGoerli}
          NFTContract={NFTcontract}
        />
        {/* -------for debugging -------
        <p> VaultContractAddress: {VAULT_ADDRESS}</p>
        <button
          onClick={() => {
            console.log(selectedNFT);
          }}
        >
          {" "}
          SelectedNFT
        </button>
        <button
          onClick={() => {
            console.log(NFTAddress);
          }}
        >
          {" "}
          NFT address for prop
        </button>
        <button
          onClick={() => {
            console.log(NFTcontract);
          }}
        >
          {" "}
          Log NFTcontract
        </button>
        <button
          onClick={() => {
            console.log(contract);
          }}
        >
          {" "}
          Log Vault contract
        </button>
        <button
          onClick={() => {
            getOwnerOfNFT(NFTcontract, 1);
          }}
        >
          {" "}
          Get Owner of NFT
        </button>
        <button
          onClick={() => {
            console.log(NFTOwners);
          }}
        >
          {" "}
          Get Owners
        </button>
        -------for debugging ------- */}
      </Card>
    </>
  );
};
