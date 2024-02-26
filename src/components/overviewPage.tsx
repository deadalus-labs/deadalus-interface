"use client";

import { DisplayFlats } from "./displayFlats";
import { useAccount } from "@starknet-react/core";
import { Account, RpcProvider, Contract, CallData, num, hash } from "starknet";

export const OverviewPage = () => {
  const flatFactory =
    "0x064e99cb9baf05302e0af1f9ea0512ccba07862d2b7d06fe503120e813fe6df4";

  const { account } = useAccount();
  const providerGoerli = new RpcProvider({
    nodeUrl: "https://starknet-testnet.public.blastapi.io/rpc/v0_6",
  });

  return (
    <>
      <DisplayFlats />
    </>
  );
};
