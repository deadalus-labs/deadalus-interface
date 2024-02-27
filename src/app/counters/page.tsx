"use client";

import CounterConnect from "@/components/counter-shell";
import CounterDeposit from "@/components/counter-deposit";
import { DisplayFlats } from "@/components/flats-overview";
import Fractionalize from "@/components/flat-deposit";
import { DisplayNFTs } from "@/components/nft-display";

const Counters = () => {
  return (
    <div>
      {/* <CounterConnect /> */}
      {/* <CounterFractionalizer /> */}
      {/* <CounterDeposit /> */}
      <Fractionalize />
      {/* <DisplayFlats /> */}
      {/* <CounterDetail /> */}
    </div>
  );
};

export default Counters;
